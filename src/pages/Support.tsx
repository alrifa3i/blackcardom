
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MessageCircle, Phone, Mail, ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
}

const Support = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // يمكن إضافة إرسال الرسالة إلى قاعدة البيانات أو عبر البريد الإلكتروني
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });
      
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        title: "خطأ في إرسال الرسالة",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">الدعم الفني</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">مركز الدعم والمساعدة</h1>
              <p className="text-xl text-gray-300">
                نحن هنا لمساعدتك. ابحث في الأسئلة الشائعة أو تواصل معنا مباشرة
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* الأسئلة الشائعة */}
              <div>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500 text-2xl">الأسئلة الشائعة</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="ابحث في الأسئلة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFAQs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border-gray-600">
                          <AccordionTrigger className="text-right text-white hover:text-yellow-400">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    {filteredFAQs.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-400">لم يتم العثور على نتائج مطابقة لبحثك</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* نموذج التواصل */}
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500 text-2xl">تواصل معنا</CardTitle>
                    <p className="text-gray-300">لم تجد إجابة لسؤالك؟ أرسل لنا رسالة وسنعود إليك قريباً</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="الاسم الكامل"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="البريد الإلكتروني"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="اكتب رسالتك هنا..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                      >
                        {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* معلومات الاتصال */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500 text-xl">طرق أخرى للتواصل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-white font-medium">الهاتف</p>
                        <p className="text-gray-300">+968 9123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-white font-medium">البريد الإلكتروني</p>
                        <p className="text-gray-300">support@theblackcard.om</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-white font-medium">ساعات العمل</p>
                        <p className="text-gray-300">السبت - الخميس: 8:00 ص - 6:00 م</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
