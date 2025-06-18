
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const SpecialServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailed_description: '',
    icon: '',
    color: '#3B82F6',
    project_types: '',
    features: '',
    is_featured: false,
    is_active: true,
    display_order: 0
  });

  const queryClient = useQueryClient();

  const { data: specialServices, isLoading } = useQuery({
    queryKey: ['special-services'],
    queryFn: async () => {
      console.log('Fetching special services...');
      const { data, error } = await supabase
        .from('special_services')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching special services:', error);
        throw error;
      }
      console.log('Special services fetched:', data);
      return data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log('Creating special service:', data);
      const serviceData = {
        ...data,
        project_types: data.project_types ? data.project_types.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        features: data.features ? data.features.split(',').map((f: string) => f.trim()).filter(Boolean) : []
      };
      
      const { error } = await supabase
        .from('special_services')
        .insert([serviceData]);
      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Special service created successfully');
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      queryClient.invalidateQueries({ queryKey: ['special-services-management'] });
      queryClient.invalidateQueries({ queryKey: ['admin-special-services'] });
      
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
      console.log('Updating special service:', id, data);
      const serviceData = {
        ...data,
        project_types: data.project_types ? data.project_types.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        features: data.features ? data.features.split(',').map((f: string) => f.trim()).filter(Boolean) : []
      };
      
      const { error } = await supabase
        .from('special_services')
        .update(serviceData)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Special service updated successfully');
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      queryClient.invalidateQueries({ queryKey: ['special-services-management'] });
      queryClient.invalidateQueries({ queryKey: ['admin-special-services'] });
      
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
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Special service deleted successfully');
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      queryClient.invalidateQueries({ queryKey: ['special-services-management'] });
      queryClient.invalidateQueries({ queryKey: ['admin-special-services'] });
      
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
      icon: '',
      color: '#3B82F6',
      project_types: '',
      features: '',
      is_featured: false,
      is_active: true,
      display_order: 0
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service: any) => {
    console.log('Editing special service:', service);
    setEditingService(service);
    setFormData({
      name: service.name || '',
      description: service.description || '',
      detailed_description: service.detailed_description || '',
      icon: service.icon || '',
      color: service.color || '#3B82F6',
      project_types: Array.isArray(service.project_types) ? service.project_types.join(', ') : '',
      features: Array.isArray(service.features) ? service.features.join(', ') : '',
      is_featured: service.is_featured || false,
      is_active: service.is_active !== undefined ? service.is_active : true,
      display_order: service.display_order || 0
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting special service form:', { editingService, formData });
    
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة الخاصة؟')) {
      deleteMutation.mutate(id);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500">إدارة الخدمات الخاصة</CardTitle>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة خدمة خاصة جديدة
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">
                {editingService ? 'تعديل الخدمة الخاصة' : 'إضافة خدمة خاصة جديدة'}
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
                    <Label htmlFor="icon" className="text-white">الأيقونة</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      placeholder="مثال: Settings"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">الوصف المختصر</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={2}
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
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div>
                    <Label htmlFor="display_order" className="text-white">ترتيب العرض</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="project_types" className="text-white">أنواع المشاريع (مفصولة بفواصل)</Label>
                  <Input
                    id="project_types"
                    value={formData.project_types}
                    onChange={(e) => setFormData({...formData, project_types: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    placeholder="تطوير البرمجيات, الذكاء الاصطناعي, الأمن السيبراني"
                  />
                </div>
                
                <div>
                  <Label htmlFor="features" className="text-white">المميزات (مفصولة بفواصل)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    placeholder="دعم 24/7, ضمان الجودة, تسليم سريع"
                  />
                </div>
                
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})}
                    />
                    <Label htmlFor="is_featured" className="text-white">خدمة مميزة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                    />
                    <Label htmlFor="is_active" className="text-white">نشطة</Label>
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
          ) : specialServices?.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">لا توجد خدمات خاصة حالياً</div>
            </div>
          ) : (
            specialServices?.map((service) => (
              <Card key={service.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold">{service.name}</h3>
                        {service.is_featured && (
                          <Badge className="bg-yellow-500 text-black text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            مميز
                          </Badge>
                        )}
                        {!service.is_active && (
                          <Badge variant="secondary" className="text-xs">
                            <EyeOff className="h-3 w-3 mr-1" />
                            غير نشط
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                      {service.project_types && Array.isArray(service.project_types) && service.project_types.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {service.project_types.map((type: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      )}
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
                        onClick={() => handleDelete(service.id)}
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
