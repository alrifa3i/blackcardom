
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Send, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SecureEmailServiceProps {
  onClose?: () => void;
}

const SecureEmailService: React.FC<SecureEmailServiceProps> = ({ onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input: string): string => {
    // Basic HTML sanitization - remove potentially dangerous tags
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  };

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);

      // Input validation
      if (!to.trim() || !subject.trim() || !content.trim()) {
        throw new Error('جميع الحقول مطلوبة');
      }

      if (!validateEmail(to.trim())) {
        throw new Error('البريد الإلكتروني غير صالح');
      }

      // Sanitize inputs
      const sanitizedTo = to.trim();
      const sanitizedSubject = sanitizeInput(subject.trim());
      const sanitizedContent = sanitizeInput(content.trim());

      // Check if user is authenticated and has admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('يجب تسجيل الدخول أولاً');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        throw new Error('ليس لديك صلاحيات لإرسال الرسائل');
      }

      // Call secure email function
      const { data, error } = await supabase.functions.invoke('send-secure-email', {
        body: {
          to: sanitizedTo,
          subject: sanitizedSubject,
          content: sanitizedContent,
          sender_id: user.id
        }
      });

      if (error) {
        throw error;
      }

      // Log email sending activity
      await supabase.rpc('log_activity', {
        p_action: 'email_sent',
        p_details: {
          recipient: sanitizedTo,
          subject: sanitizedSubject,
          timestamp: new Date().toISOString()
        }
      });

      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: `تم إرسال الرسالة إلى ${sanitizedTo}`
      });

      // Reset form
      setTo('');
      setSubject('');
      setContent('');
      
      if (onClose) {
        onClose();
      }

    } catch (error: any) {
      console.error('Email sending error:', error);
      toast({
        title: "خطأ في إرسال الرسالة",
        description: error.message || "يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-yellow-500 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          إرسال رسالة إلكترونية آمنة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-sm">
              جميع الرسائل محمية بتشفير SSL ويتم تسجيلها لأغراض أمنية
            </span>
          </div>
        </div>

        <div>
          <Label className="text-gray-300">المرسل إليه</Label>
          <Input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="example@domain.com"
            className="bg-gray-700 border-gray-600 text-white"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label className="text-gray-300">موضوع الرسالة</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="موضوع الرسالة"
            className="bg-gray-700 border-gray-600 text-white"
            disabled={isLoading}
            maxLength={200}
          />
        </div>

        <div>
          <Label className="text-gray-300">محتوى الرسالة</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="محتوى الرسالة..."
            className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
            disabled={isLoading}
            maxLength={5000}
          />
          <p className="text-gray-500 text-xs mt-1">
            {content.length}/5000 حرف
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSendEmail}
            disabled={isLoading || !to || !subject || !content}
            className="bg-yellow-500 text-black hover:bg-yellow-400 flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
          </Button>
          
          {onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-gray-300"
              disabled={isLoading}
            >
              إلغاء
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureEmailService;
