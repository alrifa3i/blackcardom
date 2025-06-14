
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Measurement ID
  // Replace with your actual GA4 Measurement ID (format: G-XXXXXXXXXX)
  googleAnalyticsMeasurementId: 'GA_MEASUREMENT_ID',
  
  // Google Ads Conversion Tracking
  // Replace with your actual conversion ID and label
  googleAdsConversion: {
    conversionId: 'AW-CONVERSION_ID',
    conversionLabel: 'CONVERSION_LABEL',
    value: 1,
    currency: 'OMR'
  },
  
  // Facebook Pixel ID (if using Facebook tracking)
  facebookPixelId: 'YOUR_FACEBOOK_PIXEL_ID',
  
  // Events configuration
  events: {
    whatsappClick: 'whatsapp_click',
    conversion: 'conversion',
    pageView: 'page_view'
  }
};

// Instructions for setup:
// 1. Replace 'GA_MEASUREMENT_ID' with your Google Analytics 4 Measurement ID
// 2. Replace 'AW-CONVERSION_ID' and 'CONVERSION_LABEL' with your Google Ads conversion tracking details
// 3. Replace 'YOUR_FACEBOOK_PIXEL_ID' with your Facebook Pixel ID if using Facebook tracking
