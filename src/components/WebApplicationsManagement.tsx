
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { QUERY_KEYS, invalidateAllQueries, DEFAULT_QUERY_OPTIONS } from '@/utils/queryKeys';
import ImageUpload from './ImageUpload';

const WebApplicationsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    technologies: '',
    client_name: '',
    project_url: '',
    completion_date: '',
    is_featured: false,
    is_visible: true,
    display_order: 0
  });

  const queryClient = useQueryClient();

  // استخدام المفاتيح الموحدة والإعدادات المحسنة
  const { data: applications, isLoading } = useQuery({
    queryKey: QUERY_KEYS.WEB_APPLICATIONS,
    queryFn: async () => {
      console.log('Fetching web applications...');
      const { data, error } = await supabase
        .from('web_applications')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching web applications:', error);
        throw error;
      }
      console.log('Web applications fetched:', data);
      return data;
    },
    ...DEFAULT_QUERY_OPTIONS
  });

  // إضافة تطبيق جديد مع Optimistic Update
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log('Creating web application:', data);
      const { data: result, error } = await supabase
        .from('web_applications')
        .insert([{
          ...data,
          technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
        }])
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onMutate: async (newApp) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.WEB_APPLICATIONS });
      const previousApps = queryClient.getQueryData(QUERY_KEYS.WEB_APPLICATIONS);
      
      const tempApp = {
        id: 'temp-' + Date.now(),
        ...newApp,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      queryClient.setQueryData(QUERY_KEYS.WEB_APPLICATIONS, (old: any) => 
        old ? [...old, tempApp] : [tempApp]
      );
      
      return { previousApps };
    },
    onSuccess: () => {
      console.log('Web application created successfully');
      invalidateAllQueries(queryClient, 'web-applications');
      toast({ title: "تم إضافة التطبيق بنجاح" });
      resetForm();
    },
    onError: (error: any, newApp, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(QUERY_KEYS.WEB_APPLICATIONS, context.previousApps);
      }
      console.error('Error creating application:', error);
      toast({ 
        title: "خطأ في إضافة التطبيق", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // تحديث تطبيق مع Optimistic Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      console.log('Updating web application:', id, data);
      const { data: result, error } = await supabase
        .from('web_applications')
        .update({
          ...data,
          technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.WEB_APPLICATIONS });
      const previousApps = queryClient.getQueryData(QUERY_KEYS.WEB_APPLICATIONS);
      
      queryClient.setQueryData(QUERY_KEYS.WEB_APPLICATIONS, (old: any) =>
        old ? old.map((app: any) => 
          app.id === id ? { ...app, ...data } : app
        ) : []
      );
      
      return { previousApps };
    },
    onSuccess: () => {
      console.log('Web application updated successfully');
      invalidateAllQueries(queryClient, 'web-applications');
      toast({ title: "تم تحديث التطبيق بنجاح" });
      resetForm();
    },
    onError: (error: any, variables, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(QUERY_KEYS.WEB_APPLICATIONS, context.previousApps);
      }
      console.error('Error updating application:', error);
      toast({ 
        title: "خطأ في تحديث التطبيق", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // حذف تطبيق مع Optimistic Update
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting web application:', id);
      const { error } = await supabase
        .from('web_applications')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return id;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.WEB_APPLICATIONS });
      const previousApps = queryClient.getQueryData(QUERY_KEYS.WEB_APPLICATIONS);
      
      queryClient.setQueryData(QUERY_KEYS.WEB_APPLICATIONS, (old: any) =>
        old ? old.filter((app: any) => app.id !== deletedId) : []
      );
      
      return { previousApps };
    },
    onSuccess: () => {
      console.log('Web application deleted successfully');
      invalidateAllQueries(queryClient, 'web-applications');
      toast({ title: "تم حذف التطبيق بنجاح" });
    },
    onError: (error: any, deletedId, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(QUERY_KEYS.WEB_APPLICATIONS, context.previousApps);
      }
      console.error('Error deleting application:', error);
      toast({ 
        title: "خطأ في حذف التطبيق", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      technologies: '',
      client_name: '',
      project_url: '',
      completion_date: '',
      is_featured: false,
      is_visible: true,
      display_order: 0
    });
    setEditingApp(null);
    setShowForm(false);
  };

  const handleEdit = (app: any) => {
    setEditingApp(app);
    setFormData({
      ...app,
      technologies: Array.isArray(app.technologies) ? app.technologies.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form:', { editingApp, formData });
    
    if (editingApp) {
      console.log('Updating application with ID:', editingApp.id);
      updateMutation.mutate({ id: editingApp.id, data: formData });
    } else {
      console.log('Creating new application');
      createMutation.mutate(formData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500">إدارة تطبيقات الويب</CardTitle>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة تطبيق جديد
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">
                {editingApp ? 'تعديل التطبيق' : 'إضافة تطبيق جديد'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">عنوان التطبيق</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client_name" className="text-white">اسم العميل</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
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
                    required
                  />
                </div>

                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageChange={(url) => setFormData({...formData, image_url: url})}
                  label="صورة التطبيق"
                />
                
                <div>
                  <Label htmlFor="project_url" className="text-white">رابط التطبيق</Label>
                  <Input
                    id="project_url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="technologies" className="text-white">التقنيات (مفصولة بفواصل)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <Label htmlFor="completion_date" className="text-white">تاريخ الإنجاز</Label>
                    <Input
                      id="completion_date"
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => setFormData({...formData, completion_date: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="display_order" className="text-white">ترتيب العرض</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})}
                    />
                    <Label htmlFor="is_featured" className="text-white">تطبيق مميز</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_visible"
                      checked={formData.is_visible}
                      onCheckedChange={(checked) => setFormData({...formData, is_visible: checked})}
                    />
                    <Label htmlFor="is_visible" className="text-white">مرئي للزوار</Label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الحفظ...' : editingApp ? 'تحديث' : 'إضافة'}
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
          ) : applications?.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">لا توجد تطبيقات حالياً</div>
            </div>
          ) : (
            applications?.map((app) => (
              <Card key={app.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {app.image_url && (
                      <div className="flex-shrink-0">
                        <img 
                          src={app.image_url} 
                          alt={app.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold">{app.title}</h3>
                        {app.is_featured && (
                          <Badge className="bg-yellow-500 text-black text-xs">مميز</Badge>
                        )}
                        {!app.is_visible && (
                          <Badge variant="secondary" className="text-xs">مخفي</Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{app.description}</p>
                      {app.client_name && (
                        <p className="text-gray-400 text-xs">العميل: {app.client_name}</p>
                      )}
                      {app.technologies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(Array.isArray(app.technologies) ? app.technologies : []).map((tech: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {app.project_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(app.project_url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(app)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(app.id)}
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

export default WebApplicationsManagement;
