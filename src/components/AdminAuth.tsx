
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
    // التحقق من وجود جلسة مصادقة
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // التحقق من أن المستخدم مدير
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.role === 'admin') {
          onAuthenticated();
        }
      }
    };

    checkSession();
  }, [onAuthenticated]);

  const handleLogin = async () => {
    setIsLoading(true);
    
    try {
      // التحقق من بيانات الدخول المحددة مسبقاً
      if (username === 'admin12' && password === 'AhmedOman2025$') {
        const adminEmail = 'admin@techservices.com';
        
        // محاولة تسجيل الدخول
        const { data, error } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: password,
        });
        
        if (error) {
          // إذا كان الحساب غير موجود، قم بإنشائه
          if (error.message === 'Invalid login credentials') {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: adminEmail,
              password: password,
              options: {
                data: {
                  username: username
                },
                emailRedirectTo: `${window.location.origin}/admin`
              }
            });
            
            if (signUpError) {
              throw signUpError;
            }
            
            if (signUpData.user) {
              await setupAdminProfile(signUpData.user.id);
              
              // تسجيل دخول فوري بعد إنشاء الحساب
              const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email: adminEmail,
                password: password,
              });
              
              if (!loginError && loginData.user) {
                await supabase.rpc('log_activity', {
                  p_action: 'user_login',
                  p_details: { username, login_type: 'admin_panel' }
                });
                
                toast({ title: "تم تسجيل الدخول بنجاح" });
                onAuthenticated();
                return;
              }
            }
          } else if (error.message === 'Email not confirmed') {
            // معالجة حالة عدم تأكيد البريد الإلكتروني
            toast({ 
              title: "تم تسجيل الدخول", 
              description: "مرحباً بك في لوحة التحكم" 
            });
            
            // تجاهل مشكلة تأكيد البريد والمتابعة
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              await setupAdminProfile(session.user.id);
              onAuthenticated();
              return;
            }
          }
          
          throw error;
        }
        
        if (data.user) {
          await setupAdminProfile(data.user.id);
          
          // تسجيل نشاط تسجيل الدخول
          await supabase.rpc('log_activity', {
            p_action: 'user_login',
            p_details: { username, login_type: 'admin_panel' }
          });
          
          toast({ title: "تم تسجيل الدخول بنجاح" });
          onAuthenticated();
        }
      } else {
        throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({ 
        title: "خطأ في تسجيل الدخول", 
        description: "يرجى التأكد من اسم المستخدم وكلمة المرور",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupAdminProfile = async (userId: string) => {
    try {
      // التحقق من وجود البروفايل
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!existingProfile) {
        // إنشاء بروفايل جديد
        await supabase
          .from('profiles')
          .insert({
            id: userId,
            username: username,
            email: 'admin@techservices.com',
            role: 'admin',
            status: 'active'
          });
      } else if (existingProfile.role !== 'admin') {
        // تحديث الدور إلى مدير
        await supabase
          .from('profiles')
          .update({ 
            role: 'admin',
            username: username,
            status: 'active'
          })
          .eq('id', userId);
      }
    } catch (error) {
      console.error('Error setting up admin profile:', error);
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
        {/* زر العودة إلى الرئيسية */}
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
