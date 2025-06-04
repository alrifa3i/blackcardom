
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const mailtoLink = `mailto:info@theblack-card.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nالهاتف: ${formData.phone}\n\nالرسالة:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "تم إرسال الرسالة بنجاح",
      description: "سيتم التواصل معك في أقرب وقت ممكن",
    });
    
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
      icon: <Phone className="h-6 w-6" />,
      title: "الهاتف",
      info: "+968 9XXX XXXX",
      action: () => window.location.href = 'tel:+96896XXXXXX'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "العنوان",
      info: "مسقط، سلطنة عُمان",
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white">تواصل معنا</Badge>
          <h2 className="text-4xl font-bold mb-4">نحن هنا للمساعدة</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            لديك مشروع في ذهنك؟ تواصل معنا اليوم ودعنا نحول رؤيتك إلى واقع رقمي مبهر
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={contact.action}
                  >
                    <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{contact.title}</h3>
                      <p className="text-gray-600">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-black text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">استشارة مجانية</h3>
                <p className="text-gray-300 mb-4">
                  احصل على استشارة مجانية لمشروعك التقني مع فريق الخبراء لدينا
                </p>
                <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
                  احجز استشارتك المجانية
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">أرسل لنا رسالة</CardTitle>
                <p className="text-gray-600">املأ النموذج أدناه وسنتواصل معك في أقرب وقت</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="اسمك الكامل"
                        required
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+968 9XXX XXXX"
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">موضوع الرسالة</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="موضوع رسالتك"
                        required
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">الرسالة</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black transition-all"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
