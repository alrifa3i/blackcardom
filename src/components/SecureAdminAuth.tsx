
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, ArrowLeft, User, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SecureAdminAuthProps {
  onAuthenticated: (user: any) => void;
}

const SecureAdminAuth: React.FC<SecureAdminAuthProps> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<Date | null>(null);

  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'Admin2025',
    password: 'AhmedOman2025$'
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Verify admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.role === 'admin') {
          onAuthenticated(session.user);
        }
      }
    };

    checkSession();

    // Check for lockout
    const storedLockout = localStorage.getItem('admin_lockout');
    if (storedLockout) {
      const lockoutEnd = new Date(storedLockout);
      if (lockoutEnd > new Date()) {
        setLockoutTime(lockoutEnd);
      } else {
        localStorage.removeItem('admin_lockout');
        localStorage.removeItem('admin_attempts');
      }
    }

    // Get stored attempts
    const storedAttempts = localStorage.getItem('admin_attempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
  }, [onAuthenticated]);

  const isLockedOut = lockoutTime && lockoutTime > new Date();

  const handleLogin = async () => {
    if (isLockedOut) {
      toast({
        title: "تم قفل الحساب مؤقتاً",
        description: `يرجى المحاولة مرة أخرى بعد ${Math.ceil((lockoutTime!.getTime() - new Date().getTime()) / 60000)} دقيقة`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Rate limiting check
      if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        const lockoutEnd = new Date(Date.now() + LOCKOUT_DURATION);
        setLockoutTime(lockoutEnd);
        localStorage.setItem('admin_lockout', lockoutEnd.toISOString());
        throw new Error('تم تجاوز عدد المحاولات المسموح بها. تم قفل الحساب مؤقتاً.');
      }

      // Validate input
      if (!username.trim() || !password.trim()) {
        throw new Error('يرجى إدخال اسم المستخدم وكلمة المرور');
      }

      // Check credentials
      if (username.trim() !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
        // Increment failed attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('admin_attempts', newAttempts.toString());
        
        throw new Error('بيانات تسجيل الدخول غير صحيحة');
      }

      // Create admin user object for successful login
      const adminUser = {
        id: 'admin-user-2025',
        username: ADMIN_CREDENTIALS.username,
        email: 'admin@techservices.com',
        role: 'admin'
      };

      // Reset login attempts on successful login
      setLoginAttempts(0);
      localStorage.removeItem('admin_attempts');
      localStorage.removeItem('admin_lockout');

      // Log successful login
      try {
        await supabase.rpc('log_activity', {
          p_action: 'admin_login_secure',
          p_details: { 
            username: ADMIN_CREDENTIALS.username,
            login_type: 'secure_admin_panel',
            timestamp: new Date().toISOString(),
            ip_address: 'client_side'
          }
        });
      } catch (logError) {
        console.warn('Failed to log activity:', logError);
      }
      
      toast({ 
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً ${ADMIN_CREDENTIALS.username}`
      });
      
      onAuthenticated(adminUser);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Log failed attempt
      try {
        await supabase.rpc('log_activity', {
          p_action: 'admin_login_failed',
          p_details: { 
            username,
            attempt_number: loginAttempts + 1,
            timestamp: new Date().toISOString(),
            error_message: error.message
          }
        });
      } catch (logError) {
        console.warn('Failed to log failed attempt:', logError);
      }

      toast({ 
        title: "خطأ في تسجيل الدخول", 
        description: error.message || "يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-md">
        <div className="mb-6">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة إلى الرئيسية
            </Button>
          </Link>
        </div>

        <Card className="bg-gray-900 border-gray-700 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              دخول آمن للوحة التحكم
            </CardTitle>
            <p className="text-gray-400 mt-2">
              يرجى إدخال بيانات المدير للوصول إلى لوحة التحكم الآمنة
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLockedOut && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
                <p className="text-red-400 text-sm">
                  تم قفل الحساب مؤقتاً لأسباب أمنية
                </p>
                <p className="text-red-300 text-xs mt-1">
                  المحاولة التالية بعد: {Math.ceil((lockoutTime!.getTime() - new Date().getTime()) / 60000)} دقيقة
                </p>
              </div>
            )}

            {!isLockedOut && loginAttempts > 0 && (
              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 text-center">
                <p className="text-yellow-400 text-sm">
                  تبقى لك {remainingAttempts} محاولة قبل قفل الحساب
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white pl-10"
                  disabled={isLoading || isLockedOut}
                  required
                  autoComplete="username"
                />
              </div>
              
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white pr-12"
                  disabled={isLoading || isLockedOut}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  disabled={isLoading || isLockedOut}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              <Button 
                type="submit"
                disabled={isLoading || !username || !password || isLockedOut}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
              >
                {isLoading ? "جارٍ المعالجة..." : "تسجيل الدخول الآمن"}
              </Button>
            </form>
            
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                استخدم بيانات المدير المحدثة
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Lock className="h-3 w-3 text-green-500" />
                <span className="text-green-400 text-xs">محمي بتشفير SSL</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecureAdminAuth;
