
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Send, Calendar, User, Mail, Phone, FolderOpen, FileText } from 'lucide-react';
import { sendEmail } from '@/utils/emailService';

interface ServiceRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    customProjectType: '',
    description: '',
    meetingDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const projectTypes = [
    'استشارات الأعمال التقنية',
    'تطوير تطبيقات الويب',
    'نظام إدارة المخزون الذكي',
    'نظام إدارة سلسلة التوريد',
    'تطبيق إدارة العملاء (CRM)',
    'منصة التجارة الإلكترونية',
    'نظام إدارة المحتوى',
    'تطبيق موبايل',
    'موقع ويب',
    'أخرى'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailContent = `طلب خدمة جديد:

الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}
نوع المشروع: ${formData.projectType === 'أخرى' ? formData.customProjectType : formData.projectType}
وصف المشروع: ${formData.description}
الموعد المناسب للاجتماع: ${formData.meetingDate}

تم الإرسال من: ${window.location.origin}
الوقت: ${new Date().toLocaleString('ar-EG')}`;

      await sendEmail('info@theblack-card.com', `طلب خدمة جديد من ${formData.name}`, emailContent);

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معك في أقرب وقت ممكن",
      });
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        projectType: '',
        customProjectType: '',
        description: '',
        meetingDate: ''
      });
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "حدث خطأ",
        description: "لم يتم إرسال الطلب، يرجى المحاولة مرة أخرى",
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
          <DialogTitle className="text-2xl font-bold text-white">طلب خدمة</DialogTitle>
          <DialogDescription className="text-gray-400">
            املأ النموذج أدناه وسنتواصل معك لمناقشة مشروعك
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
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
                <Phone className="h-4 w-4" />
                رقم الهاتف
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+968 9XXX XXXX"
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
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
              <FolderOpen className="h-4 w-4" />
              نوع المشروع المطلوب
            </label>
            <Select value={formData.projectType} onValueChange={(value) => handleChange('projectType', value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="اختر نوع المشروع" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {formData.projectType === 'أخرى' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                حدد نوع المشروع
              </label>
              <Input
                value={formData.customProjectType}
                onChange={(e) => handleChange('customProjectType', e.target.value)}
                placeholder="اكتب نوع المشروع المطلوب"
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <FileText className="h-4 w-4" />
              وصف المشروع
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="اكتب وصفاً مفصلاً عن مشروعك ومتطلباتك..."
              rows={4}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              الموعد المناسب للاجتماع الافتراضي
            </label>
            <Input
              type="datetime-local"
              value={formData.meetingDate}
              onChange={(e) => handleChange('meetingDate', e.target.value)}
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
              {isLoading ? "جارٍ الإرسال..." : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  إرسال الطلب
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

export default ServiceRequestForm;
