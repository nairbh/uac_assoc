// Analytics et SEO Tracking pour PACE ATMF Argenteuil
// Configuration optimisée pour dominer "ATMF"

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
  }
}

// Configuration Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Événements SEO cruciaux à tracker
export const SEO_EVENTS = {
  // Recherches liées à ATMF
  ATMF_SEARCH: 'atmf_search',
  ATMF_PAGE_VIEW: 'atmf_page_view',
  ATMF_CONTACT: 'atmf_contact',
  ATMF_DONATION: 'atmf_donation',
  ATMF_JOIN: 'atmf_join',
  
  // Engagement utilisateur (signaux SEO positifs)
  PAGE_SCROLL: 'page_scroll',
  TIME_ON_SITE: 'time_on_site',
  BOUNCE_RATE: 'bounce_rate',
  
  // Performances techniques (Core Web Vitals)
  CORE_WEB_VITALS: 'core_web_vitals',
  PAGE_LOAD_TIME: 'page_load_time'
};

// Tracking des pages vues avec métadonnées SEO
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      page_title: title,
      custom_map: {
        custom_parameter_1: 'atmf_location',
        custom_parameter_2: 'atmf_service'
      }
    });
    
    // Événement spécial pour les pages ATMF
    if (url.includes('atmf') || title?.includes('ATMF')) {
      window.gtag('event', SEO_EVENTS.ATMF_PAGE_VIEW, {
        event_category: 'SEO',
        event_label: 'ATMF Content Viewed',
        atmf_page: url,
        atmf_title: title
      });
    }
  }
};

// Tracking des événements SEO importants
export const trackSEOEvent = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    atmf_action?: string;
    user_engagement?: string;
  } = {}
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', eventName, {
      event_category: parameters.event_category || 'SEO',
      event_label: parameters.event_label || 'ATMF Interaction',
      value: parameters.value || 1,
      custom_parameter_1: 'Argenteuil',
      custom_parameter_2: 'ATMF',
      ...parameters
    });
  }
};

// Tracking du temps passé sur le site (signal SEO positif)
export const trackTimeOnSite = () => {
  if (typeof window === 'undefined') return;
  
  let startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Tracker par paliers (30s, 1min, 2min, 5min)
    if (timeSpent === 30 || timeSpent === 60 || timeSpent === 120 || timeSpent === 300) {
      trackSEOEvent(SEO_EVENTS.TIME_ON_SITE, {
        event_category: 'Engagement',
        event_label: `${timeSpent}s on ATMF site`,
        value: timeSpent,
        user_engagement: 'high'
      });
    }
  };
  
  // Tracker toutes les 30 secondes
  const interval = setInterval(trackTime, 30000);
  
  // Nettoyer à la fermeture
  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
    const finalTime = Math.round((Date.now() - startTime) / 1000);
    trackSEOEvent(SEO_EVENTS.TIME_ON_SITE, {
      event_category: 'Engagement',
      event_label: `Final time: ${finalTime}s`,
      value: finalTime
    });
  });
};

// Tracking du scroll (engagement utilisateur)
export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return;
  
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Tracker les jalons importants
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          trackSEOEvent(SEO_EVENTS.PAGE_SCROLL, {
            event_category: 'Engagement',
            event_label: `${milestone}% scroll depth`,
            value: milestone,
            user_engagement: milestone >= 75 ? 'high' : 'medium'
          });
        }
      });
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Tracking des Core Web Vitals (crucial pour SEO)
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Performance Observer pour les métriques Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const metricName = entry.name;
        // Correction : utiliser la propriété appropriée selon le type d'entrée
        const metricValue = 'value' in entry ? (entry as any).value : entry.startTime;
        
        trackSEOEvent(SEO_EVENTS.CORE_WEB_VITALS, {
          event_category: 'Performance',
          event_label: metricName,
          value: Math.round(metricValue),
          atmf_action: 'web_vitals_measurement'
        });
      });
    });
    
    // Observer les métriques importantes
    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
  } catch (e) {
    // Observer non supporté, pas d'erreur en production
  }
};

// Tracking des recherches internes (améliore SEO)
export const trackInternalSearch = (searchTerm: string, resultsCount: number) => {
  trackSEOEvent(SEO_EVENTS.ATMF_SEARCH, {
    event_category: 'Search',
    event_label: `Internal search: ${searchTerm}`,
    value: resultsCount,
    atmf_action: 'internal_search',
    user_engagement: 'high'
  });
};

// Tracking des interactions importantes ATMF
export const trackATMFInteraction = (action: string, details?: string) => {
  trackSEOEvent('atmf_interaction', {
    event_category: 'ATMF Engagement',
    event_label: action,
    atmf_action: action,
    user_engagement: 'high',
    value: 1
  });
};

// Initialisation complète du tracking SEO
export const initSEOTracking = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    trackTimeOnSite();
    trackScrollDepth();
    trackWebVitals();
    
    // Tracker la page d'accueil comme priorité ATMF
    trackPageView(window.location.href, document.title);
  }
};

// Google Search Console - Rich Results Testing
export const validateStructuredData = async () => {
  if (process.env.NODE_ENV === 'development') {
    // Validation disponible seulement en développement
  }
};

// Export pour utilisation dans le layout
export const SEOTracker = {
  trackPageView,
  trackSEOEvent,
  trackATMFInteraction,
  trackInternalSearch,
  initSEOTracking,
  validateStructuredData
}; 