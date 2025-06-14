
import React from 'react';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboardHeader from '@/components/AdminDashboardHeader';
import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import AdminDashboardOverview from '@/components/AdminDashboardOverview';
import SocialMediaSettings from '@/components/SocialMediaSettings';
import FAQManagement from '@/components/FAQManagement';
import WebsiteProjectsManagement from '@/components/WebsiteProjectsManagement';
import WebApplicationsManagement from '@/components/WebApplicationsManagement';
import WhatsAppAnalytics from '@/components/WhatsAppAnalytics';
import WhatsAppSettings from '@/components/WhatsAppSettings';
import GoogleAdsAnalytics from '@/components/GoogleAdsAnalytics';
import ServicesManagement from '@/components/ServicesManagement';
import ProductsManagement from '@/components/ProductsManagement';
import SpecialServicesManagement from '@/components/SpecialServicesManagement';
import UserManagement from '@/components/UserManagement';
import SystemSettings from '@/components/SystemSettings';
import ActivityLogs from '@/components/ActivityLogs';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';

const AdminDashboard = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    activeSection,
    setActiveSection,
    currentAdmin,
    sessionExpiry,
    handleLogout
  } = useAdminDashboard();

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminDashboardOverview sessionExpiry={sessionExpiry} />;
      case 'services':
        return <ServicesManagement />;
      case 'special-services':
        return <SpecialServicesManagement />;
      case 'products':
        return <ProductsManagement />;
      case 'website-projects':
        return <WebsiteProjectsManagement />;
      case 'web-applications':
        return <WebApplicationsManagement />;
      case 'whatsapp':
        return <WhatsAppAnalytics />;
      case 'google-ads':
        return <GoogleAdsAnalytics />;
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
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminDashboardHeader
        currentAdmin={currentAdmin}
        sessionExpiry={sessionExpiry}
        onLogout={handleLogout}
      />

      <div className="flex">
        <AdminDashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
