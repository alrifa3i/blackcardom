
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_PASSWORD = 'BlackOman2025$$$$'; // كلمة المرور المحدثة

  useEffect(() => {
    // التحقق من وجود جلسة مصادقة
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (isAuthenticated === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleLogin = () => {
    setIsLoading(true);
    
    // محاكاة تأخير التحقق
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminAuthenticated', 'true');
        toast({ title: "تم تسجيل الدخول بنجاح" });
        onAuthenticated();
      } else {
        toast({ 
          title: "كلمة مرور خاطئة", 
          description: "يرجى المحاولة مرة أخرى",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
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
              يرجى إدخال كلمة المرور للوصول إلى لوحة التحكم
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-800 border-gray-600 text-white pr-12"
                disabled={isLoading}
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
              onClick={handleLogin}
              disabled={isLoading || !password}
              className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
            >
              {isLoading ? "جارٍ التحقق..." : "دخول"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
