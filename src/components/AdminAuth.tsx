
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkExistingSession();
  }, [onAuthenticated]);

  const checkExistingSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session check error:', error);
        return;
      }

      if (session?.user) {
        // التحقق من صلاحيات المدير
        const isAdmin = await verifyAdminRole(session.user.id);
        if (isAdmin) {
          onAuthenticated();
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const verifyAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error verifying admin role:', error);
        return false;
      }
      
      return data?.role === 'admin';
    } catch (error) {
      console.error('Admin verification error:', error);
      return false;
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم المستخدم وكلمة المرور",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // تنظيف الجلسة السابقة
      await supabase.auth.signOut();
      
      // التحقق من بيانات الدخول
      if (username !== 'admin12' || password !== 'AhmedOman2025$') {
        throw new Error('بيانات الدخول غير صحيحة');
      }

      const adminEmail = 'admin@techservices.com';
      
      // محاولة تسجيل الدخول
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: password,
      });
      
      if (signInError) {
        // إذا كان الحساب غير موجود، قم بإنشائه
        if (signInError.message.includes('Invalid login credentials')) {
          await createAdminAccount(adminEmail, password, username);
          return;
        }
        
        // إذا كان البريد غير مؤكد، تجاهل المشكلة وتابع
        if (signInError.message.includes('Email not confirmed')) {
          console.log('Email not confirmed, but proceeding with login');
          
          // الحصول على الجلسة الحالية
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            await ensureAdminProfile(session.user.id, username);
            await logLoginActivity(username);
            
            toast({
              title: "تم تسجيل الدخول بنجاح",
              description: "مرحباً بك في لوحة التحكم"
            });
            
            onAuthenticated();
            return;
          }
        }
        
        throw signInError;
      }
      
      if (signInData.user) {
        await ensureAdminProfile(signInData.user.id, username);
        await logLoginActivity(username);
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم"
        });
        
        onAuthenticated();
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createAdminAccount = async (email: string, password: string, username: string) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { username: username },
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      if (signUpData.user) {
        await ensureAdminProfile(signUpData.user.id, username);
        
        // محاولة تسجيل دخول فوري
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (!loginError && loginData.user) {
          await logLoginActivity(username);
          
          toast({
            title: "تم إنشاء الحساب وتسجيل الدخول",
            description: "مرحباً بك في لوحة التحكم"
          });
          
          onAuthenticated();
        }
      }
    } catch (error: any) {
      throw new Error('فشل في إنشاء حساب المدير: ' + error.message);
    }
  };

  const ensureAdminProfile = async (userId: string, username: string) => {
    try {
      // التحقق من وجود البروفايل
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
      }
      
      if (!existingProfile) {
        // إنشاء بروفايل جديد
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            username: username,
            email: 'admin@techservices.com',
            role: 'admin',
            status: 'active'
          });
        
        if (insertError) {
          console.error('Error creating admin profile:', insertError);
        }
      } else if (existingProfile.role !== 'admin') {
        // تحديث الدور إلى مدير
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            role: 'admin',
            username: username,
            status: 'active'
          })
          .eq('id', userId);
        
        if (updateError) {
          console.error('Error updating admin profile:', updateError);
        }
      }
    } catch (error) {
      console.error('Error in ensureAdminProfile:', error);
    }
  };

  const logLoginActivity = async (username: string) => {
    try {
      await supabase.rpc('log_activity', {
        p_action: 'user_login',
        p_details: { username, login_type: 'admin_panel' }
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

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
              <Lock className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              دخول لوحة التحكم
            </CardTitle>
            <p className="text-gray-400 mt-2">
              يرجى إدخال بيانات المدير للوصول إلى لوحة التحكم
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-gray-800 border-gray-600 text-white pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-gray-800 border-gray-600 text-white pr-12"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              <Button 
                type="submit"
                disabled={isLoading || !username || !password}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
              >
                {isLoading ? "جارٍ المعالجة..." : "تسجيل الدخول"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
