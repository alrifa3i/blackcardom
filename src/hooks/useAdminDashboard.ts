
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Verify admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          setCurrentAdmin({
            id: session.user.id,
            username: profile.username,
            email: session.user.email,
            loginTime: new Date(session.user.last_sign_in_at || ''),
            role: 'admin'
          });
          setIsAuthenticated(true);

          // Set session expiry (24 hours from login)
          const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
          setSessionExpiry(expiryTime);

          // Update last login time
          await supabase.rpc('update_user_last_login', {
            user_id: session.user.id
          });
        } else {
          // Not an admin, sign out
          await supabase.auth.signOut();
          toast({
            title: "ليس لديك صلاحيات إدارية",
            variant: "destructive"
          });
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setCurrentAdmin(null);
        setSessionExpiry(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // Session timeout check
  useEffect(() => {
    if (!sessionExpiry) return;

    const checkExpiry = () => {
      if (new Date() > sessionExpiry) {
        handleLogout();
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "يرجى تسجيل الدخول مرة أخرى",
          variant: "destructive"
        });
      }
    };

    const interval = setInterval(checkExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [sessionExpiry, toast]);

  const handleLogout = async () => {
    try {
      // Log logout activity
      if (currentAdmin) {
        await supabase.rpc('log_activity', {
          p_action: 'admin_logout_secure',
          p_details: { 
            username: currentAdmin.username,
            logout_type: 'secure_admin_panel',
            session_duration: sessionExpiry ? Math.round((new Date().getTime() - new Date(currentAdmin.loginTime).getTime()) / 1000) : 0,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear session storage
      sessionStorage.removeItem('admin_session_start');
      sessionStorage.removeItem('admin_user_id');
      
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      setSessionExpiry(null);
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "شكراً لاستخدامك لوحة التحكم الآمنة"
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      
      // Force logout even if there's an error
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      setSessionExpiry(null);
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    activeSection,
    setActiveSection,
    currentAdmin,
    sessionExpiry,
    handleLogout
  };
};
