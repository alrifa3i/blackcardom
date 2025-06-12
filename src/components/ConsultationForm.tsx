
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Send, Calendar, User, Mail, MessageSquare, Clock, Phone } from 'lucide-react';

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    consultationDate: '',
    consultationType: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const consultationTypes = [
    'استشارة تقنية عامة',
    'تطوير التطبيقات',
    'إدارة المشاريع',
    'الحلول السحابية',
    'الأمن السيبراني',
    'التجارة الإلكترونية',
    'التسويق الرقمي',
    'أخرى'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailContent = `
طلب استشارة مجانية:

الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
رقم الواتساب: ${formData.whatsapp}
موعد الاستشارة: ${formData.consultationDate}
نوع الاستشارة: ${formData.consultationType}
وصف الاستشارة: ${formData.description}

تم الإرسال من: ${window.location.origin}
الوقت: ${new Date().toLocaleString('ar-EG')}
      `;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'info@theblack-card.com',
          subject: `طلب استشارة مجانية من ${formData.name}`,
          content: emailContent
        }),
      });

      if (response.ok) {
        toast({
          title: "تم حجز الاستشارة بنجاح",
          description: "سيتم التواصل معك عبر الواتساب لتأكيد الموعد",
        });
        
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          consultationDate: '',
          consultationType: '',
          description: ''
        });
        onClose();
      } else {
        throw new Error('فشل في إرسال البريد');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "حدث خطأ",
        description: "لم يتم حجز الاستشارة، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">احجز استشارتك المجانية</DialogTitle>
          <DialogDescription className="text-gray-400">
            احصل على استشارة مجانية مع فريق الخبراء لدينا
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <User className="h-4 w-4" />
              الاسم الكامل
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="اسمك الكامل"
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Mail className="h-4 w-4" />
              البريد الإلكتروني
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الواتساب مع كود الدولة
            </label>
            <Input
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+968 9XXX XXXX"
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              موعد الاستشارة
            </label>
            <Input
              type="datetime-local"
              value={formData.consultationDate}
              onChange={(e) => handleChange('consultationDate', e.target.value)}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Clock className="h-4 w-4" />
              نوع الاستشارة
            </label>
            <Select value={formData.consultationType} onValueChange={(value) => handleChange('consultationType', value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="اختر نوع الاستشارة" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {consultationTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              وصف الاستشارة
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="اكتب تفاصيل ما تحتاج استشارة بشأنه..."
              rows={4}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400"
            >
              {isLoading ? "جارٍ الحجز..." : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  حجز الاستشارة
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
