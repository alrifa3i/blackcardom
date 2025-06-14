
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Zap } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

const PROJECT_ID = 'tech-services-project';

const ServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'development',
    price: 0,
    unit: 'project',
    is_active: true,
    image_url: '',
    project_id: PROJECT_ID
  });

  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services', PROJECT_ID],
    queryFn: async () => {
      console.log('Fetching services for project:', PROJECT_ID);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('project_id', PROJECT_ID)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      
      console.log('Fetched services:', data);
      return data || [];
    }
  });

  // Clear existing data and add default services for this project
  const initializeMutation = useMutation({
    mutationFn: async () => {
      console.log('Initializing services for project:', PROJECT_ID);
      
      // First, delete any existing services for this project
      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('project_id', PROJECT_ID);
      
      if (deleteError) {
        console.error('Error deleting existing services:', deleteError);
        throw deleteError;
      }

      // Default services for tech services project
      const defaultServices = [
        {
          name: "استشارات الأعمال التقنية",
          description: "استشارات متخصصة لتحسين العمليات وزيادة الكفاءة باستخدام التقنيات الحديثة",
          type: "consulting",
          price: 150,
          unit: "ساعة",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "تطوير تطبيقات الويب",
          description: "تصميم وتطوير تطبيقات ويب احترافية باستخدام أحدث التقنيات",
          type: "development",
          price: 2000,
          unit: "مشروع",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "تطوير أنظمة إدارة المخزون",
          description: "أنظمة ذكية ومتطورة لإدارة المخزون والمستودعات مع تتبع دقيق للمنتجات",
          type: "development",
          price: 2500,
          unit: "نظام",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "تطوير التطبيقات المحمولة",
          description: "تطبيقات أصلية ومتطورة للهواتف الذكية والأجهزة اللوحية",
          type: "mobile",
          price: 3000,
          unit: "تطبيق",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "أنظمة الذكاء الاصطناعي",
          description: "تطوير حلول الذكاء الاصطناعي وتعلم الآلة المتقدمة للأعمال",
          type: "ai",
          price: 4000,
          unit: "نظام",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "أنظمة الحماية السيبرانية",
          description: "حلول أمنية متطورة لحماية البيانات والأنظمة من التهديدات السيبرانية",
          type: "security",
          price: 3500,
          unit: "نظام",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "التسويق الرقمي الذكي",
          description: "حلول التسويق الرقمي المدعومة بالذكاء الاصطناعي والتحليلات المتقدمة",
          type: "marketing",
          price: 800,
          unit: "شهر",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "أنظمة إدارة المحتوى",
          description: "منصات متطورة لإدارة المحتوى الرقمي والنشر الذكي",
          type: "cms",
          price: 1800,
          unit: "نظام",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "استشارات التحول الرقمي",
          description: "إرشاد الشركات خلال رحلة التحول الرقمي الشامل والمتطور",
          type: "consulting",
          price: 200,
          unit: "ساعة",
          is_active: true,
          project_id: PROJECT_ID,
          image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80"
        }
      ];

      const { error: insertError } = await supabase
        .from('services')
        .insert(defaultServices);
        
      if (insertError) {
        console.error('Error inserting default services:', insertError);
        throw insertError;
      }
      
      console.log('Successfully initialized services for project:', PROJECT_ID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "تم إضافة الخدمات الافتراضية بنجاح" });
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const serviceData = { ...data, project_id: PROJECT_ID };
      console.log('Creating service:', serviceData);
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "تم إضافة الخدمة بنجاح" });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const serviceData = { ...data, project_id: PROJECT_ID };
      console.log('Updating service:', id, serviceData);
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .eq('project_id', PROJECT_ID);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "تم تحديث الخدمة بنجاح" });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting service:', id);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('project_id', PROJECT_ID);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "تم حذف الخدمة بنجاح" });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'development',
      price: 0,
      unit: 'project',
      is_active: true,
      image_url: '',
      project_id: PROJECT_ID
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({ ...service, project_id: PROJECT_ID });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            إدارة الخدمات التقنية
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => initializeMutation.mutate()}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              إعادة تهيئة الخدمات
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              إضافة خدمة جديدة
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">اسم الخدمة</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-white">نوع الخدمة</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-md"
                      required
                    >
                      <option value="development">تطوير</option>
                      <option value="consulting">استشارات</option>
                      <option value="security">أمان</option>
                      <option value="ai">ذكاء اصطناعي</option>
                      <option value="mobile">تطبيقات محمولة</option>
                      <option value="marketing">تسويق رقمي</option>
                      <option value="cms">إدارة المحتوى</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={3}
                  />
                </div>

                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageChange={(url) => setFormData({...formData, image_url: url})}
                  label="صورة الخدمة"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-white">السعر</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="bg-gray-600 border-gray-500 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit" className="text-white">الوحدة</Label>
                    <select
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-md"
                    >
                      <option value="نظام">نظام</option>
                      <option value="ساعة">ساعة</option>
                      <option value="مشروع">مشروع</option>
                      <option value="شهر">شهر</option>
                      <option value="سنة">سنة</option>
                      <option value="تطبيق">تطبيق</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                  />
                  <Label htmlFor="is_active" className="text-white">خدمة نشطة</Label>
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-400">
                    {editingService ? 'تحديث' : 'إضافة'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <div className="grid gap-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">جاري التحميل...</div>
            </div>
          ) : !services || services.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">لا توجد خدمات لهذا المشروع حالياً</div>
              <Button
                onClick={() => initializeMutation.mutate()}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                إضافة الخدمات الافتراضية التقنية
              </Button>
            </div>
          ) : (
            services?.map((service) => (
              <Card key={service.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {service.image_url && (
                      <div className="flex-shrink-0">
                        <img 
                          src={service.image_url} 
                          alt={service.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold">{service.name}</h3>
                        <Badge className={`text-xs ${service.is_active ? 'bg-green-500 text-black' : 'bg-gray-500 text-white'}`}>
                          {service.is_active ? 'نشط' : 'غير نشط'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {service.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-yellow-900 text-yellow-200">
                          {PROJECT_ID}
                        </Badge>
                      </div>
                      {service.description && (
                        <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-yellow-500 font-semibold">
                          {service.price} ريال عُماني / {service.unit}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(service.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesManagement;
