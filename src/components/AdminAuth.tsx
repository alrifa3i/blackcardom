
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, ArrowLeft, Mail, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // التحقق من أن المستخدم مدير
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        
        if (profileError) throw profileError;
        
        if (profile?.role !== 'admin') {
          await supabase.auth.signOut();
          throw new Error('ليس لديك صلاحية للوصول إلى لوحة التحكم');
        }
        
        // تسجيل نشاط تسجيل الدخول
        await supabase.rpc('log_activity', {
          p_action: 'user_login',
          p_details: { email, login_type: 'admin_panel' }
        });
        
        toast({ title: "تم تسجيل الدخول بنجاح" });
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

  const handleSignup = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({ 
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى تسجيل الدخول الآن"
        });
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setUsername('');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({ 
        title: "خطأ في إنشاء الحساب", 
        description: error.message || "يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
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
              {isLogin ? 'دخول لوحة التحكم' : 'إنشاء حساب إداري'}
            </CardTitle>
            <p className="text-gray-400 mt-2">
              {isLogin 
                ? 'يرجى إدخال بيانات المدير للوصول إلى لوحة التحكم'
                : 'إنشاء حساب إداري جديد للوصول إلى لوحة التحكم'
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
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
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                disabled={isLoading || !email || !password || (!isLogin && !username)}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
              >
                {isLoading 
                  ? "جارٍ المعالجة..." 
                  : isLogin ? "تسجيل الدخول" : "إنشاء الحساب"
                }
              </Button>
            </form>
            
            <div className="text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setUsername('');
                }}
                className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                disabled={isLoading}
              >
                {isLogin 
                  ? 'ليس لديك حساب؟ إنشاء حساب جديد'
                  : 'لديك حساب؟ تسجيل الدخول'
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
