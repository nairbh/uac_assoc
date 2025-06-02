/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configuration de sécurité renforcée
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Protection XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Empêche le sniffing de type MIME
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Protection clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Politique de sécurité du contenu
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.helloasso.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              "connect-src 'self' https://*.supabase.co https://www.helloasso.com https://api.stripe.com wss://*.supabase.co",
              "frame-src 'self' https://www.helloasso.com https://js.stripe.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://www.helloasso.com",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // HSTS (HTTPS strict transport security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Politique de référent
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: [
              'geolocation=()',
              'microphone=()',
              'camera=()',
              'payment=(self "https://www.helloasso.com")',
              'usb=()',
              'magnetometer=()',
              'gyroscope=()',
              'speaker=()',
              'fullscreen=(self)',
              'sync-xhr=()'
            ].join(', ')
          },
          // Protection contre les attaques de timing
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          }
        ],
      },
      // Headers spécifiques pour les API
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ],
      },
    ];
  },
  // Redirections de sécurité
  async redirects() {
    return [
      // Redirection de sécurité pour les anciennes URLs
      {
        source: '/.env',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.git/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
  },
  // Configuration de production
  poweredByHeader: false, // Masquer l'en-tête "X-Powered-By"
  compress: true, // Compression gzip
};

module.exports = nextConfig;
