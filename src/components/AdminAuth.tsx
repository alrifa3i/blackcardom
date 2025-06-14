
import React from 'react';
import SecureAdminAuth from './SecureAdminAuth';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const handleAuthenticated = (user: any) => {
    // Store secure session info
    sessionStorage.setItem('admin_session_start', new Date().toISOString());
    sessionStorage.setItem('admin_user_id', user.id);
    onAuthenticated();
  };

  return <SecureAdminAuth onAuthenticated={handleAuthenticated} />;
};

export default AdminAuth;
