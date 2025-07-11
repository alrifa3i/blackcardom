
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sendEmail } from '@/utils/emailService';
import ConsultationForm from './ConsultationForm';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailContent = `
رسالة جديدة من موقع The Black Card:

الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
الهاتف: ${formData.phone}
الموضوع: ${formData.subject}

الرسالة:
${formData.message}

تم الإرسال من: ${window.location.origin}
الوقت: ${new Date().toLocaleString('ar-EG')}
      `;

      await sendEmail(
        'info@theblack-card.com',
        `رسالة جديدة من ${formData.name}: ${formData.subject}`,
        emailContent
      );

      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: "سيتم التواصل معك في أقرب وقت ممكن",
      });
      
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "حدث خطأ",
        description: "لم يتم إرسال الرسالة، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "البريد الإلكتروني",
      info: "info@theblack-card.com",
      action: () => window.location.href = 'mailto:info@theblack-card.com'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "العنوان",
      info: "Al Khuwair / Bousher / Muscat Governorate",
      subtitle: "الخوير / بوشر / محافظة مسقط",
      action: () => {}
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "ساعات العمل",
      info: "الأحد - الخميس: 8:00 - 17:00",
      action: () => {}
    }
  ];

  return (
    <>
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">تواصل معنا</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">نحن هنا للمساعدة</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              لديك مشروع في ذهنك؟ تواصل معنا اليوم ودعنا نحول رؤيتك إلى واقع رقمي مبهر
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-0 shadow-lg bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">معلومات التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={contact.action}
                    >
                      <div className="w-12 h-12 bg-yellow-500 text-black rounded-lg flex items-center justify-center">
                        {contact.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{contact.title}</h3>
                        <p className="text-gray-300">{contact.info}</p>
                        {contact.subtitle && (
                          <p className="text-gray-400 text-sm">{contact.subtitle}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-yellow-500 text-black">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">استشارة مجانية</h3>
                  <p className="text-gray-800 mb-4">
                    احصل على استشارة مجانية لمشروعك التقني مع فريق الخبراء لدينا
                  </p>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800"
                    onClick={() => setShowConsultationForm(true)}
                  >
                    احجز استشارتك المجانية
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">أرسل لنا رسالة</CardTitle>
                  <p className="text-gray-300">املأ النموذج أدناه وسنتواصل معك في أقرب وقت</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">الاسم الكامل</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="اسمك الكامل"
                          required
                          className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">البريد الإلكتروني</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">رقم الهاتف</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+968 9XXX XXXX"
                          className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">موضوع الرسالة</label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="موضوع رسالتك"
                          required
                          className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">الرسالة</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                        required
                        className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isLoading}
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all"
                    >
                      {isLoading ? "جارٍ الإرسال..." : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </>
  );
};

export default ContactSection;
