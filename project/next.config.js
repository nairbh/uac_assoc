/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration SEO et performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Désactiver ESLint pendant le build en production
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Désactiver TypeScript errors pendant le build (temporaire)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuration de sécurité pour la production
  ...(process.env.NODE_ENV === 'production' && {
    // Compiler avec optimisations maximales
    compiler: {
      // Supprimer les console.log en production
      removeConsole: {
        exclude: ['error', 'warn'], // Garder seulement error et warn
      },
    },
    
    // Minification agressive
    swcMinify: true,
    
    // Configuration webpack pour obfuscation
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        // Configuration pour obfusquer le code en production
        config.optimization = {
          ...config.optimization,
          minimize: true,
          minimizer: [
            ...config.optimization.minimizer,
          ],
        };
        
        // Obfuscation des noms de variables/fonctions
        config.output = {
          ...config.output,
          pathinfo: false,
        };
        
        // Désactiver les source maps en production
        config.devtool = false;
      }
      
      return config;
    },
    
    // Headers de sécurité supplémentaires
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
          ],
        },
      ];
    },
  }),
  
  // Images
  images: {
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'www.gravatar.com',
      'atmf-argenteuil.org'
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configuration Netlify optimisée
  trailingSlash: false,
  output: 'standalone',
  
  // Variables d'environnement publiques sécurisées
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
    SITE_URL: 'https://atmf-argenteuil.org',
    SITE_NAME: 'PACE ATMF Argenteuil',
    SITE_DESCRIPTION: 'Association laïque, démocratique et solidaire depuis 1985'
  },
  
  // Redirections de sécurité
  async redirects() {
    return [
      // Bloquer l'accès aux fichiers sensibles
      {
        source: '/.env',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/.env.local',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/package.json',
        destination: '/404',
        permanent: true,
      },
    ];
  },

  // Headers de sécurité et SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        // Cache optimal pour les ressources statiques
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Cache pour les favicons
        source: '/favicon(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Headers spéciaux pour le sitemap
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      },
      {
        // Headers pour robots.txt
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      }
    ]
  },

  // Redirections pour SEO
  async redirects() {
    return [
      {
        source: '/join',
        destination: '/membership',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/about',
        permanent: false,
      }
    ]
  },

  // Optimisation du build
  swcMinify: true,
  
  // Configuration Webpack pour optimiser les performances
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimisation pour la production
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      }
    }
    
    return config
  },

  // Configuration pour le déploiement
  output: 'standalone',
  
  // Optimisation des polices
  optimizeFonts: true,

  // Configuration pour l'analyse des bundles
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      )
      return config
    },
  }),

  // Gestion des erreurs 404 personnalisées pour SEO
  async rewrites() {
    return [
      {
        source: '/news/feed',
        destination: '/api/feed',
      },
      {
        source: '/events/feed',
        destination: '/api/events-feed',
      }
    ]
  }
};

module.exports = nextConfig;
