
import React from 'react';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboardHeader from '@/components/AdminDashboardHeader';
import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import AdminDashboardContentRenderer from '@/components/AdminDashboardContentRenderer';
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
          <AdminDashboardContentRenderer
            activeSection={activeSection}
            sessionExpiry={sessionExpiry}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
