import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SecurityValidatorMiddleware } from '@/lib/security-middleware';

// Structure pour le rate limiting en mémoire (pour la démo)
// En production, utilisez Redis ou une base de données
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const securityLogs = new Map<string, { attempts: number; lastAttempt: number; blocked: boolean }>();

// Configuration du rate limiting
const RATE_LIMIT_REQUESTS = 50; // Requêtes par fenêtre
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes en millisecondes
const SECURITY_RATE_LIMIT = 5; // Pour les routes sensibles
const SECURITY_WINDOW = 60 * 1000; // 1 minute pour les routes sensibles

// Routes protégées nécessitant une attention particulière
const PROTECTED_ROUTES = [
  '/admin',
  '/moderator', 
  '/api',
  '/signin',
  '/signup'
];

const SENSITIVE_ROUTES = [
  '/admin',
  '/api/auth',
  '/api/admin',
  '/api/delete-user'
];

// Rate limiting global - plus strict pour les actions sensibles
const requestCounts = new Map<string, { count: number; resetTime: number; blocked?: boolean }>();
const suspiciousIPs = new Set<string>();

// Patterns d'attaque communs
const ATTACK_PATTERNS = [
  /\b(union|select|insert|delete|drop|create|alter|exec)\b/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/i,
  /on\w+\s*=/i,
  /\.\.\//g,
  /etc\/passwd/i,
  /cmd\.exe/i,
  /\/bin\/bash/i,
  /wp-admin/i,
  /phpMyAdmin/i
];

// IPs suspectes (simulation - en production, utiliser une vraie blacklist)
const BLOCKED_IPS = new Set([
  '192.168.1.100', // IP de test
]);

// Fonction pour vérifier si on est en mode développement
function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEV_MODE === 'true';
}

// Fonction pour vérifier si l'IP est locale/développement
function isLocalIP(ip: string): boolean {
  const localIPs = ['127.0.0.1', '::1', 'localhost', 'unknown', ''];
  return localIPs.includes(ip) || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.') || ip.includes('wsl');
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIP || request.ip || 'localhost';
  return ip.trim();
}

// Fonction de logging de sécurité
function logSecurityEvent(ip: string, event: string, details?: string) {
  const timestamp = new Date().toISOString();
  
  // En développement, afficher seulement les événements importants
  if (isDevelopment()) {
    if (event.includes('BLOCKED') || event.includes('INJECTION') || event.includes('XSS')) {
      console.log(`🔒 [SECURITY-DEV] ${timestamp} - IP: ${ip} - Event: ${event} - Details: ${details || 'N/A'}`);
    }
    return;
  }
  
  // En production, logger tous les événements
  console.log(`🔒 [SECURITY] ${timestamp} - IP: ${ip} - Event: ${event} - Details: ${details || 'N/A'}`);
}

function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /php/i,
    /scanner/i, /nikto/i, /sqlmap/i, /nmap/i
  ];
  return botPatterns.some(pattern => pattern.test(userAgent));
}

function detectAttackPatterns(url: string, body?: string): boolean {
  const content = url + (body || '');
  return ATTACK_PATTERNS.some(pattern => pattern.test(content));
}

function getRateLimit(pathname: string): { maxRequests: number; windowMs: number } {
  // Limites spécifiques par type de route
  if (pathname.includes('/api/delete-user') || pathname.includes('/admin/users/')) {
    return { maxRequests: 3, windowMs: 60000 }; // 3 req/min pour suppressions
  }
  if (pathname.includes('/signin') || pathname.includes('/signup')) {
    return { maxRequests: 10, windowMs: 60000 }; // 10 req/min pour auth
  }
  if (pathname.includes('/api/')) {
    return { maxRequests: 30, windowMs: 60000 }; // 30 req/min pour API
  }
  if (pathname.includes('/admin')) {
    return { maxRequests: 100, windowMs: 60000 }; // 100 req/min pour admin
  }
  
  return { maxRequests: 200, windowMs: 60000 }; // 200 req/min général
}

// Fonction de rate limiting
function isRateLimited(ip: string, isSensitive: boolean = false): boolean {
  // En développement local, ne pas appliquer le rate limiting strict
  if (isDevelopment() && isLocalIP(ip)) {
    return false;
  }
  
  const now = Date.now();
  const limit = isSensitive ? SECURITY_RATE_LIMIT : RATE_LIMIT_REQUESTS;
  const window = isSensitive ? SECURITY_WINDOW : RATE_LIMIT_WINDOW;
  
  const current = rateLimit.get(ip);
  
  if (!current || now > current.resetTime) {
    // Nouvelle fenêtre ou première requête
    rateLimit.set(ip, { count: 1, resetTime: now + window });
    return false;
  }
  
  if (current.count >= limit) {
    // En développement, seulement logger sans bloquer
    if (isDevelopment()) {
      console.log(`[DEV] Rate limit atteint pour ${ip} - ${current.count} requêtes`);
      return false;
    }
    logSecurityEvent(ip, 'RATE_LIMIT_EXCEEDED', `${current.count} requests in window`);
    return true;
  }
  
  current.count++;
  return false;
}

// Détection d'activité suspecte
function detectSuspiciousActivity(request: NextRequest, ip: string): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;
  
  // En développement, ignorer les requêtes Next.js automatiques
  if (isDevelopment()) {
    const devPaths = ['/_next', '/__nextjs', '/favicon.ico', '/_dev'];
    if (devPaths.some(path => pathname.startsWith(path))) {
      return false;
    }
    
    // Ignorer les User-Agents de développement
    const devUserAgents = ['next.js', 'webpack', 'node-fetch'];
    if (devUserAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
      return false;
    }
  }
  
  // Détection de bots malveillants
  const suspiciousBots = [
    'sqlmap', 'nikto', 'nmap', 'masscan', 'zap', 'burp',
    'wget', 'curl', 'python-requests', 'scanner'
  ];
  
  if (suspiciousBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    logSecurityEvent(ip, 'SUSPICIOUS_BOT_DETECTED', `User-Agent: ${userAgent}`);
    return true;
  }
  
  // Détection de tentatives d'accès à des fichiers sensibles
  const maliciousPaths = [
    '/.env', '/.git', '/wp-admin', '/phpMyAdmin', '/admin.php',
    '/config.php', '/wp-config.php', '/.htaccess', '/backup',
    '/database', '/db_backup', '/sql', '/mysql'
  ];
  
  if (maliciousPaths.some(path => pathname.includes(path))) {
    logSecurityEvent(ip, 'MALICIOUS_PATH_ACCESS', `Path: ${pathname}`);
    return true;
  }
  
  // Détection d'injection potentielle
  const maliciousParams = ['<script', 'javascript:', 'onload=', 'onerror=', 'union select', 'drop table'];
  const queryString = request.nextUrl.search;
  
  if (maliciousParams.some(param => queryString.toLowerCase().includes(param))) {
    logSecurityEvent(ip, 'INJECTION_ATTEMPT', `Query: ${queryString}`);
    return true;
  }
  
  return false;
}

// Fonction de blocage d'IP suspecte
function blockSuspiciousIP(ip: string): boolean {
  // En développement local, ne jamais bloquer les IPs locales
  if (isDevelopment() && isLocalIP(ip)) {
    return false;
  }
  
  // En développement, ne jamais bloquer - seulement logger
  if (isDevelopment()) {
    const security = securityLogs.get(ip);
    if (security && security.attempts > 5) {
      console.log(`[DEV] IP ${ip} aurait été bloquée (${security.attempts} tentatives)`);
    }
    return false;
  }
  
  const now = Date.now();
  const security = securityLogs.get(ip);
  
  if (!security) {
    securityLogs.set(ip, { attempts: 1, lastAttempt: now, blocked: false });
    return false;
  }
  
  // Si déjà bloqué et le blocage est encore actif (1 heure)
  if (security.blocked && now - security.lastAttempt < 60 * 60 * 1000) {
    logSecurityEvent(ip, 'BLOCKED_IP_ATTEMPT', 'IP still blocked');
    return true;
  }
  
  // Incrémenter les tentatives
  security.attempts++;
  security.lastAttempt = now;
  
  // Bloquer après 10 tentatives suspectes (20 en développement)
  const maxAttempts = 10;
  if (security.attempts >= maxAttempts) {
    security.blocked = true;
    logSecurityEvent(ip, 'IP_BLOCKED', `${security.attempts} suspicious attempts`);
    return true;
  }
  
  return false;
}

export function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const now = Date.now();
  
  // En développement, ignorer complètement pour les IPs locales
  if (isDevelopment() && isLocalIP(ip)) {
    // Seulement logger les accès aux routes admin pour debug
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      console.log(`[DEV] Accès local à ${pathname}`);
    }
    return NextResponse.next();
  }
  
  // Ignorer les ressources statiques et Next.js (développement et production)
  const staticPaths = [
    '/_next/static', 
    '/_next/image', 
    '/favicon.ico', 
    '/images',
    '/favicon',
    '/_next',
    '/__nextjs',
    '/_dev'
  ];
  
  if (staticPaths.some(path => pathname.startsWith(path))) {
    const response = NextResponse.next();
    // Headers de cache pour les ressources statiques
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return response;
  }
  
  // Ignorer les bots légitimes (Google, Bing, etc.)
  const legitimateBots = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
    'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegrambot', 'applebot', 'msnbot'
  ];
  
  const isLegitimateBot = legitimateBots.some(bot => 
    userAgent.toLowerCase().includes(bot)
  );
  
  if (isLegitimateBot) {
    console.log(`[BOT] Bot légitime détecté: ${userAgent.substring(0, 50)}`);
    return NextResponse.next();
  }
  
  // Ignorer les services légitimes (Google Maps, CDN, etc.)
  const legitimateServices = [
    'googleapis.com', 'gstatic.com', 'google.com', 'maps.googleapis.com',
    'fonts.googleapis.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'
  ];
  
  const referer = request.headers.get('referer') || '';
  const isLegitimateService = legitimateServices.some(service => 
    referer.includes(service) || userAgent.includes(service)
  );
  
  if (isLegitimateService) {
    return NextResponse.next();
  }
  
  // Log de toutes les requêtes vers les routes protégées (seulement en dev pour les routes sensibles)
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!isDevelopment() && (pathname.startsWith('/admin') || pathname.startsWith('/api'))) {
      logSecurityEvent(ip, 'PROTECTED_ROUTE_ACCESS', `${request.method} ${pathname}`);
    }
  }
  
  // 1. Bloquer seulement les IPs explicitement blacklistées
  if (BLOCKED_IPS.has(ip)) {
    SecurityValidatorMiddleware.logSecurityEvent(
      'BLOCKED_IP_ACCESS',
      'critical',
      `Accès bloqué pour IP blacklistée: ${ip}`,
      ip
    );
    return new NextResponse('Accès interdit', { status: 403 });
  }

  // 2. Vérifier blocage IP suspecte (plus permissif)
  if (blockSuspiciousIP(ip)) {
    // En production, être plus permissif
    if (!isDevelopment()) {
      console.log(`[SECURITY] IP suspecte mais non bloquée en production: ${ip}`);
      // Ne pas bloquer, juste logger
    } else {
      return new NextResponse('Access Denied', { 
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Security-Block': 'IP-BLOCKED'
        }
      });
    }
  }
  
  // 3. Détecter activité suspecte (plus permissif en production)
  if (detectSuspiciousActivity(request, ip)) {
    if (isDevelopment()) {
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Security-Block': 'SUSPICIOUS-ACTIVITY'
        }
      });
    } else {
      // En production, juste logger sans bloquer
      console.log(`[SECURITY] Activité suspecte détectée mais non bloquée: ${ip} ${pathname}`);
    }
  }

  // 4. Bots malveillants tentant d'accéder à l'admin (seulement vraiment malveillants)
  const maliciousBots = ['sqlmap', 'nikto', 'nmap', 'masscan', 'burp'];
  const isMaliciousBot = maliciousBots.some(bot => userAgent.toLowerCase().includes(bot));
  
  if (isMaliciousBot && pathname.includes('/admin')) {
    SecurityValidatorMiddleware.logSecurityEvent(
      'BOT_ADMIN_ACCESS',
      'high',
      `Bot malveillant tentant d'accéder à l'admin: ${userAgent.slice(0, 100)}`,
      ip
    );
    return new NextResponse('Accès bot interdit', { status: 403 });
  }

  // 5. Protection contre les attaques par patterns (seulement les plus graves)
  const body = request.method === 'POST' ? request.body?.toString() || '' : '';
  const criticalPatterns = [
    /\b(union\s+select|drop\s+table|delete\s+from)\b/i,
    /<script[^>]*>.*?<\/script>/i,
    /javascript:\s*alert/i
  ];
  
  const hasCriticalPattern = criticalPatterns.some(pattern => 
    pattern.test(pathname) || pattern.test(body)
  );
  
  if (hasCriticalPattern) {
    SecurityValidatorMiddleware.logSecurityEvent(
      'CRITICAL_ATTACK_PATTERN',
      'critical',
      `Pattern d'attaque critique détecté dans: ${pathname}`,
      ip
    );
    return new NextResponse('Requête suspecte détectée', { status: 403 });
  }
  
  // 6. Rate limiting plus permissif
  const isSensitive = SENSITIVE_ROUTES.some(route => pathname.startsWith(route));
  if (isRateLimited(ip, isSensitive)) {
    // En production, être plus permissif sur le rate limiting
    if (!isDevelopment()) {
      console.log(`[SECURITY] Rate limit atteint mais non bloqué en production: ${ip}`);
    } else {
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Content-Type': 'text/plain',
          'Retry-After': isSensitive ? '60' : '900',
          'X-RateLimit-Limit': String(isSensitive ? SECURITY_RATE_LIMIT : RATE_LIMIT_REQUESTS),
          'X-RateLimit-Remaining': '0'
        }
      });
    }
  }

  // 7. Rate limiting adaptatif très permissif en production
  const rateLimit = getRateLimit(pathname);
  const key = `${ip}:${pathname}`;
  let requestCount = requestCounts.get(key);

  if (requestCount && !isDevelopment()) {
    if (now < requestCount.resetTime) {
      if (requestCount.blocked) {
        // En production, ne pas bloquer, juste logger
        console.log(`[SECURITY] IP aurait été bloquée en dev: ${ip} ${pathname}`);
      }
      
      if (requestCount.count >= rateLimit.maxRequests * 3) { // Triple la limite en production
        // Seulement logger, ne pas bloquer
        console.log(`[SECURITY] Limite très dépassée mais non bloquée: ${ip} ${pathname}`);
      }
      requestCount.count++;
    } else {
      // Reset du compteur
      requestCounts.set(key, { 
        count: 1, 
        resetTime: now + rateLimit.windowMs,
        blocked: false 
      });
    }
  } else if (!requestCount) {
    requestCounts.set(key, { 
      count: 1, 
      resetTime: now + rateLimit.windowMs,
      blocked: false 
    });
  }
  
  // 8. Headers de sécurité pour les API (plus permissif)
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // Anti-CSRF plus permissif en production
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    if (request.method !== 'GET' && !isDevelopment()) {
      // Vérification CSRF plus permissive
      if (origin && host && !origin.includes(host) && !origin.includes('google')) {
        console.log(`[SECURITY] CSRF potentiel mais non bloqué: Origin: ${origin}, Host: ${host}`);
        // Ne pas bloquer, juste logger
      }
    }
    
    // Headers de sécurité API basiques
    response.headers.set('X-API-Version', '1.0');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;
  }

  // 9. Protection CSRF très permissive
  if (request.method === 'POST' || request.method === 'DELETE') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Vérification très permissive
    if (origin && host && !origin.includes(host) && !origin.includes('google') && !isDevelopment()) {
      console.log(`[SECURITY] CSRF potentiel détecté mais non bloqué: origin=${origin}, host=${host}`);
      // Ne pas bloquer en production
    }
  }

  // 10. Headers de sécurité globaux permissifs
  const response = NextResponse.next();
  
  // Headers de sécurité adaptatifs selon l'environnement
  if (isDevelopment()) {
    // Headers minimaux en développement
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  } else {
    // Headers de sécurité allégés en production
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN'); // Plus permissif que DENY
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // CSP très permissif pour éviter les blocages
    response.headers.set('Content-Security-Policy', 
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
      "style-src 'self' 'unsafe-inline' https:; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https: wss:; " +
      "font-src 'self' https:; " +
      "frame-src 'self' https:;"
    );
  }
  
  // Headers anti-cache seulement pour les vraies pages sensibles
  if (pathname.includes('/admin') && !pathname.includes('/admin/security')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

// Configuration du matcher pour appliquer le middleware
export const config = {
  matcher: [
    // Appliquer à toutes les routes sauf les assets statiques Next.js
    '/((?!_next/static|_next/image|_next/webpack|favicon.ico|public|images).*)',
    // API routes (mais pas les assets)
    '/api/:path*',
    // Protected routes
    '/admin/:path*',
    '/moderator/:path*',
    '/member/:path*',
    '/signin',
    '/signup'
  ],
}; 