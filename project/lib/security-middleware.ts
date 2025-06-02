// Version allégée de SecurityValidator pour le middleware (edge runtime)
// Ne peut pas utiliser DOMPurify car window n'est pas disponible

export class SecurityValidatorMiddleware {
  // Patterns de détection d'injection SQL
  private static SQL_INJECTION_PATTERNS = [
    /(\b(select|insert|update|delete|drop|create|alter|exec|union)\b)/i,
    /((\%27)|(\'))\s*((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /((\%27)|(\'))union/i,
    /exec(\s|\+)+(s|x)p\w+/i,
    /UNION.*SELECT.*FROM/i,
    /SELECT.*FROM.*WHERE/i
  ];

  // Patterns de détection XSS
  private static XSS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /expression\s*\(/i,
    /vbscript:/i
  ];

  // Patterns d'attaque par traversée de chemin
  private static PATH_TRAVERSAL_PATTERNS = [
    /\.\.\//g,
    /\.\.\\/g,
    /%2e%2e%2f/gi,
    /%2e%2e%5c/gi,
    /\.\.%2f/gi,
    /\.\.%5c/gi
  ];

  /**
   * Détecte les tentatives d'injection SQL
   */
  static detectSQLInjection(input: string): boolean {
    if (!input || typeof input !== 'string') return false;
    
    const normalizedInput = input.toLowerCase();
    return this.SQL_INJECTION_PATTERNS.some(pattern => pattern.test(normalizedInput));
  }

  /**
   * Détecte les tentatives XSS
   */
  static detectXSS(input: string): boolean {
    if (!input || typeof input !== 'string') return false;
    
    return this.XSS_PATTERNS.some(pattern => pattern.test(input));
  }

  /**
   * Détecte les tentatives de traversée de chemin
   */
  static detectPathTraversal(input: string): boolean {
    if (!input || typeof input !== 'string') return false;
    
    return this.PATH_TRAVERSAL_PATTERNS.some(pattern => pattern.test(input));
  }

  /**
   * Obfusque les données sensibles pour les logs
   */
  static obfuscate(data: string): string {
    if (!data || typeof data !== 'string') return '[REDACTED]';
    
    // Email : garder le premier caractère et le domaine
    if (data.includes('@')) {
      const [local, domain] = data.split('@');
      return `${local.charAt(0)}***@${domain}`;
    }
    
    // ID : garder les 4 premiers caractères
    if (data.length > 8) {
      return `${data.substring(0, 4)}****`;
    }
    
    // Autres : obfusquer partiellement
    if (data.length > 3) {
      return `${data.charAt(0)}***${data.charAt(data.length - 1)}`;
    }
    
    return '***';
  }

  /**
   * Log des événements de sécurité (version middleware)
   */
  static logSecurityEvent(
    eventType: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    message: string,
    ipAddress: string,
    userId?: string
  ): void {
    const timestamp = new Date().toISOString();
    const logLevel = severity === 'critical' ? '🚨' : 
                     severity === 'high' ? '⚠️' : 
                     severity === 'medium' ? '🔍' : '📝';
    
    console.log(
      `${logLevel} [SECURITY-MIDDLEWARE] ${timestamp} - ${eventType} - ${severity.toUpperCase()} - IP: ${ipAddress} - ${message}${userId ? ` - User: ${this.obfuscate(userId)}` : ''}`
    );
  }

  /**
   * Valide un email (version simplifiée)
   */
  static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Valide une URL (version simplifiée)
   */
  static isValidURL(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Détecte les tentatives d'attaque globales
   */
  static detectAttack(input: string): { isAttack: boolean; attackType?: string } {
    if (!input || typeof input !== 'string') {
      return { isAttack: false };
    }

    if (this.detectSQLInjection(input)) {
      return { isAttack: true, attackType: 'SQL_INJECTION' };
    }

    if (this.detectXSS(input)) {
      return { isAttack: true, attackType: 'XSS' };
    }

    if (this.detectPathTraversal(input)) {
      return { isAttack: true, attackType: 'PATH_TRAVERSAL' };
    }

    return { isAttack: false };
  }

  /**
   * Nettoie une chaîne de caractères (version basique sans DOMPurify)
   */
  static sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
} 