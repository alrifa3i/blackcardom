
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const ServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: 0,
    unit: 'person',
    image_url: '',
    is_active: true
  });

  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      console.log('Fetching services...');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      console.log('Services fetched:', data);
      return data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log('Creating service:', data);
      const { error } = await supabase
        .from('services')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Service created successfully');
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services-management'] });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      
      toast({ title: "تم إضافة الخدمة بنجاح" });
      resetForm();
    },
    onError: (error) => {
      console.error('Error creating service:', error);
      toast({ 
        title: "خطأ في إضافة الخدمة", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      console.log('Updating service:', id, data);
      const { error } = await supabase
        .from('services')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Service updated successfully');
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services-management'] });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      
      toast({ title: "تم تحديث الخدمة بنجاح" });
      resetForm();
    },
    onError: (error) => {
      console.error('Error updating service:', error);
      toast({ 
        title: "خطأ في تحديث الخدمة", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting service:', id);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Service deleted successfully');
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services-management'] });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      
      toast({ title: "تم حذف الخدمة بنجاح" });
    },
    onError: (error) => {
      console.error('Error deleting service:', error);
      toast({ 
        title: "خطأ في حذف الخدمة", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      price: 0,
      unit: 'person',
      image_url: '',
      is_active: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service: any) => {
    console.log('Editing service:', service);
    setEditingService(service);
    setFormData({
      name: service.name || '',
      description: service.description || '',
      type: service.type || '',
      price: service.price || 0,
      unit: service.unit || 'person',
      image_url: service.image_url || '',
      is_active: service.is_active !== undefined ? service.is_active : true
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form:', { editingService, formData });
    
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      deleteMutation.mutate(id);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500">إدارة الخدمات التقنية</CardTitle>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة خدمة جديدة
          </Button>
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
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-white">السعر</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      className="bg-gray-600 border-gray-500 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit" className="text-white">الوحدة</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image_url" className="text-white">رابط الصورة</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                  />
                  <Label htmlFor="is_active" className="text-white">الخدمة نشطة</Label>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                    disabled={isSubmitting}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'جاري الحفظ...' : editingService ? 'تحديث' : 'إضافة'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="mr-2 h-4 w-4" />
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
          ) : services?.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">لا توجد خدمات حالياً</div>
            </div>
          ) : (
            services?.map((service) => (
              <Card key={service.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{service.name}</h3>
                      <p className="text-gray-300 text-sm mt-1">{service.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-yellow-500 font-bold">${service.price}</span>
                        <span className="text-gray-400 text-sm">لكل {service.unit}</span>
                        <span className="text-gray-400 text-sm">النوع: {service.type}</span>
                        {!service.is_active && (
                          <span className="text-red-400 text-sm">غير نشطة</span>
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

export default ServicesManagement;
