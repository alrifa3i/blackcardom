
// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    ga: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export interface ConversionConfig {
  conversionId?: string;
  conversionLabel?: string;
  value?: number;
  currency?: string;
}

export interface WhatsAppClickData {
  employeeName: string;
  pageUrl: string;
  pageTitle: string;
}

export const trackWhatsAppClick = (data: WhatsAppClickData, conversionConfig?: ConversionConfig) => {
  const { employeeName, pageUrl, pageTitle } = data;

  // Google Analytics 4 Event Tracking
  if (typeof window !== 'undefined' && window.gtag) {
    // Track engagement event
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'whatsapp_button',
      employee_name: employeeName,
      page_location: pageUrl,
      page_title: pageTitle,
      custom_parameter_1: 'whatsapp_conversion'
    });

    // Track conversion if config provided
    if (conversionConfig?.conversionId && conversionConfig?.conversionLabel) {
      window.gtag('event', 'conversion', {
        send_to: `${conversionConfig.conversionId}/${conversionConfig.conversionLabel}`,
        event_category: 'lead',
        event_label: 'whatsapp_contact',
        value: conversionConfig.value || 1,
        currency: conversionConfig.currency || 'OMR'
      });
    }

    console.log('Google Analytics 4 event tracked: whatsapp_click');
  }

  // Universal Analytics (legacy support)
  if (typeof window !== 'undefined' && window.ga) {
    window.ga('send', 'event', 'WhatsApp', 'Click', employeeName, 1);
    console.log('Universal Analytics event tracked');
  }

  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp Contact',
      content_category: 'Customer Support',
      employee_name: employeeName
    });
    console.log('Facebook Pixel event tracked');
  }
};

export const initializeGoogleAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = window.gtag || function() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  console.log('Google Analytics initialized with ID:', measurementId);
};

export const trackPageView = (pageTitle: string, pageUrl: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageTitle,
      page_location: pageUrl
    });
  }
};
