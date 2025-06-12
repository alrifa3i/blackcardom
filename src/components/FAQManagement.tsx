
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  is_active: boolean;
}

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order_index: 0,
    is_active: true
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "خطأ في تحميل الأسئلة",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingFaq) {
        // تحديث سؤال موجود
        const { error } = await supabase
          .from('faqs')
          .update(formData)
          .eq('id', editingFaq.id);
        
        if (error) throw error;
        
        toast({
          title: "تم تحديث السؤال بنجاح",
          description: "تم حفظ التغييرات",
        });
      } else {
        // إنشاء سؤال جديد
        const { error } = await supabase
          .from('faqs')
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: "تم إضافة السؤال بنجاح",
          description: "تم إنشاء سؤال جديد",
        });
      }

      setIsDialogOpen(false);
      setEditingFaq(null);
      setFormData({ question: '', answer: '', order_index: 0, is_active: true });
      fetchFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: "خطأ في حفظ السؤال",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order_index: faq.order_index,
      is_active: faq.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "تم حذف السؤال بنجاح",
        description: "تم إزالة السؤال من القائمة",
      });
      
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "خطأ في حذف السؤال",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = async (faq: FAQ) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !faq.is_active })
        .eq('id', faq.id);
      
      if (error) throw error;
      
      toast({
        title: faq.is_active ? "تم إخفاء السؤال" : "تم إظهار السؤال",
        description: "تم تحديث حالة العرض",
      });
      
      fetchFAQs();
    } catch (error) {
      console.error('Error toggling FAQ visibility:', error);
      toast({
        title: "خطأ في تحديث السؤال",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const openNewDialog = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '', order_index: faqs.length + 1, is_active: true });
    setIsDialogOpen(true);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500">إدارة الأسئلة الشائعة</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog} className="bg-yellow-500 text-black hover:bg-yellow-400">
                <Plus className="mr-2 h-4 w-4" />
                إضافة سؤال جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingFaq ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="السؤال"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="الإجابة"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    required
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="ترتيب العرض"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="is_active" className="text-white">نشط</label>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  {loading ? 'جاري الحفظ...' : (editingFaq ? 'تحديث السؤال' : 'إضافة السؤال')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium flex-1">{faq.question}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={faq.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {faq.is_active ? 'نشط' : 'مخفي'}
                  </Badge>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    #{faq.order_index}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{faq.answer}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(faq)}
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleVisibility(faq)}
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  {faq.is_active ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(faq.id)}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          
          {faqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">لا توجد أسئلة شائعة حالياً</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQManagement;
