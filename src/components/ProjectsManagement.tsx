
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, ExternalLink, FolderOpen } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

const ProjectsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    logo: '',
    country: '',
    date: '',
    status: 'مكتمل',
    technologies: '',
    achievements: '',
    project_url: '',
    stats: '',
    is_visible: true,
    display_order: 0
  });

  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('projects')
        .insert([{
          ...data,
          technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
          achievements: data.achievements.split(',').map((a: string) => a.trim()).filter(Boolean),
          stats: data.stats ? JSON.parse(data.stats) : {}
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "تم إضافة المشروع بنجاح" });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const { error } = await supabase
        .from('projects')
        .update({
          ...data,
          technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
          achievements: data.achievements.split(',').map((a: string) => a.trim()).filter(Boolean),
          stats: data.stats ? JSON.parse(data.stats) : {}
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "تم تحديث المشروع بنجاح" });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "تم حذف المشروع بنجاح" });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image_url: '',
      logo: '',
      country: '',
      date: '',
      status: 'مكتمل',
      technologies: '',
      achievements: '',
      project_url: '',
      stats: '',
      is_visible: true,
      display_order: 0
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      achievements: Array.isArray(project.achievements) ? project.achievements.join(', ') : '',
      stats: typeof project.stats === 'object' ? JSON.stringify(project.stats) : project.stats || ''
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            إدارة المشاريع
          </CardTitle>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة مشروع جديد
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">
                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">اسم المشروع</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-white">الدولة/المدينة</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
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
                    required
                  />
                </div>

                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageChange={(url) => setFormData({...formData, image_url: url})}
                  label="صورة المشروع"
                />

                <ImageUpload
                  currentImageUrl={formData.logo}
                  onImageChange={(url) => setFormData({...formData, logo: url})}
                  label="شعار المشروع"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-white">سنة الإنجاز</Label>
                    <Input
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-white">حالة المشروع</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-600 border-gray-500">
                        <SelectItem value="مكتمل">مكتمل</SelectItem>
                        <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
                      </SelectContent>
                    </Select>
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

                <div>
                  <Label htmlFor="project_url" className="text-white">رابط المشروع</Label>
                  <Input
                    id="project_url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    placeholder="https://example.com"
                  />
                </div>
                
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
                  <Label htmlFor="achievements" className="text-white">الإنجازات (مفصولة بفواصل)</Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    placeholder="تحسين الأداء بنسبة 50%, زيادة المبيعات بنسبة 30%"
                  />
                </div>

                <div>
                  <Label htmlFor="stats" className="text-white">الإحصائيات (JSON)</Label>
                  <Textarea
                    id="stats"
                    value={formData.stats}
                    onChange={(e) => setFormData({...formData, stats: e.target.value})}
                    className="bg-gray-600 border-gray-500 text-white"
                    placeholder='{"users": "500+", "efficiency": "95%", "satisfaction": "4.9/5"}'
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_visible"
                    checked={formData.is_visible}
                    onCheckedChange={(checked) => setFormData({...formData, is_visible: checked})}
                  />
                  <Label htmlFor="is_visible" className="text-white">مرئي للزوار</Label>
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-400">
                    {editingProject ? 'تحديث' : 'إضافة'}
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
          ) : projects?.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">لا توجد مشاريع حالياً</div>
            </div>
          ) : (
            projects?.map((project) => (
              <Card key={project.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {project.image_url && (
                      <div className="flex-shrink-0">
                        <img 
                          src={project.image_url} 
                          alt={project.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold">{project.name}</h3>
                        <Badge className={`${
                          project.status === 'مكتمل' ? 'bg-green-500' : 'bg-blue-500'
                        } text-white text-xs`}>
                          {project.status}
                        </Badge>
                        {!project.is_visible && (
                          <Badge variant="secondary" className="text-xs">مخفي</Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                      <p className="text-gray-400 text-xs mb-2">{project.country} - {project.date}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(Array.isArray(project.technologies) ? project.technologies : []).map((tech: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.project_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(project.project_url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(project.id)}
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

export default ProjectsManagement;
