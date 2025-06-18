
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Star, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const PROJECT_ID = 'military-tech-project';

interface SpecialService {
  id: string;
  name: string;
  description?: string;
  detailed_description?: string;
  project_types?: string[];
  features?: string[];
  icon?: string;
  color?: string;
  is_featured?: boolean;
  is_active: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
  project_id?: string;
}

const SpecialServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<SpecialService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailed_description: '',
    project_types: [] as string[],
    features: [] as string[],
    icon: '',
    color: '#3B82F6',
    is_featured: false,
    is_active: true,
    display_order: 0,
    project_id: PROJECT_ID
  });

  const queryClient = useQueryClient();

  // Get special services
  const { data: specialServices, isLoading } = useQuery({
    queryKey: ['admin-special-services', PROJECT_ID],
    queryFn: async (): Promise<SpecialService[]> => {
      console.log('Fetching special services for project:', PROJECT_ID);
      const { data, error } = await supabase
        .from('special_services')
        .select('*')
        .eq('project_id', PROJECT_ID)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching special services:', error);
        throw error;
      }
      
      console.log('Fetched special services:', data);
      return (data || []) as SpecialService[];
    }
  });

  // Initialize special services for military project
  const initializeMutation = useMutation({
    mutationFn: async () => {
      console.log('Initializing special services for project:', PROJECT_ID);
      
      // First, delete any existing special services for this project
      const { error: deleteError } = await supabase
        .from('special_services')
        .delete()
        .eq('project_id', PROJECT_ID);
      
      if (deleteError) {
        console.error('Error deleting existing special services:', deleteError);
        throw deleteError;
      }

      // Default special services for military tech project
      const defaultSpecialServices = [
        {
          name: "خدمات الأمن السيبراني المتقدمة",
          description: "حماية شاملة للأنظمة العسكرية الحساسة",
          detailed_description: "خدمات أمن سيبراني متطورة تشمل الحماية من التهديدات المتقدمة وأنظمة الكشف المبكر",
          project_types: ["أنظمة القيادة", "شبكات الاتصال", "قواعد البيانات العسكرية"],
          features: ["مراقبة 24/7", "كشف التهديدات المتقدمة", "استجابة فورية", "تحليل الثغرات"],
          icon: "🛡️",
          color: "#DC2626",
          is_featured: true,
          is_active: true,
          display_order: 1,
          project_id: PROJECT_ID
        },
        {
          name: "أنظمة الذكاء الاصطناعي للاستطلاع",
          description: "تقنيات ذكية لتحليل البيانات الاستطلاعية",
          detailed_description: "حلول ذكاء اصطناعي متطورة لتحليل البيانات والصور والإشارات للأغراض العسكرية",
          project_types: ["استطلاع جوي", "مراقبة حدودية", "تحليل الصور"],
          features: ["تحليل الصور بالذكاء الاصطناعي", "كشف الأنماط", "التنبؤ التكتيكي", "معالجة البيانات الضخمة"],
          icon: "🤖",
          color: "#7C3AED",
          is_featured: true,
          is_active: true,
          display_order: 2,
          project_id: PROJECT_ID
        },
        {
          name: "حلول الاتصالات المشفرة",
          description: "أنظمة اتصال آمنة ومشفرة للعمليات العسكرية",
          detailed_description: "شبكات اتصال عسكرية آمنة بتشفير متطور لضمان سرية الاتصالات",
          project_types: ["اتصالات تكتيكية", "شبكات القيادة", "اتصالات الطوارئ"],
          features: ["تشفير عسكري", "مقاومة التشويش", "شبكات متنقلة", "اتصال متعدد القنوات"],
          icon: "📡",
          color: "#059669",
          is_featured: false,
          is_active: true,
          display_order: 3,
          project_id: PROJECT_ID
        }
      ];

      const { error: insertError } = await supabase
        .from('special_services')
        .insert(defaultSpecialServices);
        
      if (insertError) {
        console.error('Error inserting default special services:', insertError);
        throw insertError;
      }
      
      console.log('Successfully initialized special services for project:', PROJECT_ID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-special-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['special-services-public'] });
      toast({ title: "تم إضافة الخدمات الخاصة الافتراضية بنجاح" });
    },
    onError: (error) => {
      console.error('Error initializing special services:', error);
      toast({ 
        title: "خطأ في إضافة الخدمات الخاصة الافتراضية", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const serviceData = { ...data, project_id: PROJECT_ID };
      console.log('Creating special service:', serviceData);
      const { error } = await supabase
        .from('special_services')
        .insert([serviceData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-special-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['special-services-public'] });
      toast({ title: "تم إضافة الخدمة الخاصة بنجاح" });
      resetForm();
    },
    onError: (error) => {
      console.error('Error creating special service:', error);
      toast({ 
        title: "خطأ في إضافة الخدمة الخاصة", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const serviceData = { ...data, project_id: PROJECT_ID };
      console.log('Updating special service:', id, serviceData);
      const { error } = await supabase
        .from('special_services')
        .update(serviceData)
        .eq('id', id)
        .eq('project_id', PROJECT_ID);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-special-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['special-services-public'] });
      toast({ title: "تم تحديث الخدمة الخاصة بنجاح" });
      resetForm();
    },
    onError: (error) => {
      console.error('Error updating special service:', error);
      toast({ 
        title: "خطأ في تحديث الخدمة الخاصة", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting special service:', id);
      const { error } = await supabase
        .from('special_services')
        .delete()
        .eq('id', id)
        .eq('project_id', PROJECT_ID);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-special-services', PROJECT_ID] });
      queryClient.invalidateQueries({ queryKey: ['special-services-public'] });
      toast({ title: "تم حذف الخدمة الخاصة بنجاح" });
    },
    onError: (error) => {
      console.error('Error deleting special service:', error);
      toast({ 
        title: "خطأ في حذف الخدمة الخاصة", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      detailed_description: '',
      project_types: [],
      features: [],
      icon: '',
      color: '#3B82F6',
      is_featured: false,
      is_active: true,
      display_order: 0,
      project_id: PROJECT_ID
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service: SpecialService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      detailed_description: service.detailed_description || '',
      project_types: service.project_types || [],
      features: service.features || [],
      icon: service.icon || '',
      color: service.color || '#3B82F6',
      is_featured: service.is_featured || false,
      is_active: service.is_active,
      display_order: service.display_order || 0,
      project_id: PROJECT_ID
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting special service form:', { editingService, formData });
    
    if (editingService) {
      console.log('Updating special service with ID:', editingService.id);
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      console.log('Creating new special service');
      createMutation.mutate(formData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Star className="h-5 w-5" />
            إدارة الخدمات الخاصة - المشروع العسكري التقني
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => initializeMutation.mutate()}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              disabled={initializeMutation.isPending}
            >
              {initializeMutation.isPending ? 'جاري التهيئة...' : 'إعادة تهيئة الخدمات الخاصة'}
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              إضافة خدمة خاصة
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {editingService ? 'تعديل الخدمة الخاصة' : 'إضافة خدمة خاصة جديدة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">اسم الخدمة الخاصة</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">الوصف المختصر</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={2}
                    placeholder="وصف مختصر للخدمة الخاصة"
                  />
                </div>

                <div>
                  <Label htmlFor="detailed_description" className="text-white">الوصف التفصيلي</Label>
                  <Textarea
                    id="detailed_description"
                    value={formData.detailed_description}
                    onChange={(e) => setFormData({...formData, detailed_description: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={3}
                    placeholder="وصف تفصيلي أكثر للخدمة الخاصة"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon" className="text-white">الأيقونة (اختيارية)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      placeholder="مثال: 🛡️ أو 🚀"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color" className="text-white">اللون</Label>
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white h-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="display_order" className="text-white">ترتيب العرض</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                    className="bg-gray-600 border-gray-500 text-white"
                    min="0"
                  />
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})}
                    />
                    <Label htmlFor="is_featured" className="text-white">خدمة مميزة</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                    />
                    <Label htmlFor="is_active" className="text-white">خدمة نشطة</Label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الحفظ...' : editingService ? 'تحديث' : 'إضافة'}
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
          ) : !specialServices || specialServices.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <div className="text-gray-400 mb-4">لا توجد خدمات خاصة لهذا المشروع حالياً</div>
              <Button
                onClick={() => initializeMutation.mutate()}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                إضافة الخدمات الخاصة الافتراضية
              </Button>
            </div>
          ) : (
            specialServices?.map((service) => (
              <Card key={service.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {service.icon && <span className="text-lg">{service.icon}</span>}
                        <h3 className="text-white font-semibold">{service.name}</h3>
                        {service.is_featured && (
                          <Badge className="bg-yellow-500 text-black text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            مميزة
                          </Badge>
                        )}
                        <Badge className={`text-xs ${service.is_active ? 'bg-green-500 text-black' : 'bg-gray-500 text-white'}`}>
                          {service.is_active ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                          {service.is_active ? 'نشطة' : 'غير نشطة'}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-yellow-900 text-yellow-200">
                          {PROJECT_ID}
                        </Badge>
                      </div>
                      {service.description && (
                        <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                      )}
                      {service.detailed_description && (
                        <p className="text-gray-400 text-xs mb-2">{service.detailed_description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">ترتيب: {service.display_order}</span>
                        {service.color && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">اللون:</span>
                            <div 
                              className="w-4 h-4 rounded border border-gray-500" 
                              style={{ backgroundColor: service.color }}
                            ></div>
                          </div>
                        )}
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

export default SpecialServicesManagement;
