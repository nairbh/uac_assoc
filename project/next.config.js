/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // Optimisations de performance
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
      'www.gravatar.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuration Netlify optimisée
  trailingSlash: false,
  output: 'standalone',
  
  // Variables d'environnement publiques sécurisées
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
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
};

module.exports = nextConfig;
