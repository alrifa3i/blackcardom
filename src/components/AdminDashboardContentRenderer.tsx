
import React from 'react';
import AdminDashboardOverview from './AdminDashboardOverview';
import SocialMediaSettings from './SocialMediaSettings';
import FAQManagement from './FAQManagement';
import WebsiteProjectsManagement from './WebsiteProjectsManagement';
import WebApplicationsManagement from './WebApplicationsManagement';
import WhatsAppAnalytics from './WhatsAppAnalytics';
import WhatsAppSettings from './WhatsAppSettings';
import GoogleAdsAnalytics from './GoogleAdsAnalytics';
import ServicesManagement from './ServicesManagement';
import ProductsManagement from './ProductsManagement';
import ProjectsManagement from './ProjectsManagement';
import SpecialServicesManagement from './SpecialServicesManagement';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import ActivityLogs from './ActivityLogs';
import GoogleAnalyticsSettings from './GoogleAnalyticsSettings';
import EnhancedWhatsAppAnalytics from './EnhancedWhatsAppAnalytics';

interface AdminDashboardContentRendererProps {
  activeSection: string;
  sessionExpiry: Date | null;
}

const AdminDashboardContentRenderer: React.FC<AdminDashboardContentRendererProps> = ({
  activeSection,
  sessionExpiry
}) => {
  console.log('Active section:', activeSection); // Debug log

  switch (activeSection) {
    case 'overview':
      return <AdminDashboardOverview sessionExpiry={sessionExpiry} />;
    case 'services':
      return <ServicesManagement />;
    case 'special-services':
      return <SpecialServicesManagement />;
    case 'products':
      return <ProductsManagement />;
    case 'projects':
      return <ProjectsManagement />;
    case 'website-projects':
      return <WebsiteProjectsManagement />;
    case 'web-applications':
      return <WebApplicationsManagement />;
    case 'whatsapp':
      return <EnhancedWhatsAppAnalytics />;
    case 'google-ads':
      return <GoogleAdsAnalytics />;
    case 'google-analytics-settings':
      return <GoogleAnalyticsSettings />;
    case 'whatsapp-settings':
      return <WhatsAppSettings />;
    case 'social':
      return <SocialMediaSettings />;
    case 'faq':
      return <FAQManagement />;
    case 'users':
      return <UserManagement />;
    case 'system-settings':
      return <SystemSettings />;
    case 'activity-logs':
      return <ActivityLogs />;
    default:
      console.log('Unknown section:', activeSection); // Debug log
      return <AdminDashboardOverview sessionExpiry={sessionExpiry} />;
  }
};

export default AdminDashboardContentRenderer;
