
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Measurement ID
  // Replace with your actual GA4 Measurement ID (format: G-XXXXXXXXXX)
  googleAnalyticsMeasurementId: 'G-X84CNEM0FW',
  
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

// Function to get analytics settings from database
export const getAnalyticsSettings = async () => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase
      .from('system_settings')
      .select('key, value')
      .in('key', [
        'google_analytics_tracking_id',
        'google_ads_conversion_id',
        'google_ads_conversion_label',
        'google_ads_conversion_value',
        'google_ads_currency',
        'facebook_pixel_id'
      ]);
    
    if (error) throw error;
    
    const settings: Record<string, string> = {};
    data?.forEach(item => {
      settings[item.key] = item.value;
    });
    
    return {
      googleAnalyticsMeasurementId: settings.google_analytics_tracking_id || 'G-X84CNEM0FW',
      googleAdsConversion: {
        conversionId: settings.google_ads_conversion_id || 'AW-CONVERSION_ID',
        conversionLabel: settings.google_ads_conversion_label || 'CONVERSION_LABEL',
        value: parseInt(settings.google_ads_conversion_value || '1'),
        currency: settings.google_ads_currency || 'OMR'
      },
      facebookPixelId: settings.facebook_pixel_id || '',
      events: ANALYTICS_CONFIG.events
    };
  } catch (error) {
    console.error('Error fetching analytics settings:', error);
    return ANALYTICS_CONFIG;
  }
};

// Instructions for setup:
// 1. Settings are now stored in the database via the admin dashboard
// 2. Go to Admin Dashboard → Google Analytics Settings to configure
// 3. Current default GA ID: G-X84CNEM0FW
// 4. Configure your Google Ads conversion tracking details
// 5. Optional: Add Facebook Pixel ID for Facebook tracking
