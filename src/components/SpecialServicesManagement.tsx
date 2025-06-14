
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Star, Link, Eye, EyeOff } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define types for special services
interface SpecialService {
  id: string;
  name: string;
  description?: string;
  detailed_description?: string;
  base_service_id?: string;
  project_types?: string[];
  features?: string[];
  icon?: string;
  color?: string;
  is_featured?: boolean;
  is_active: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit?: string;
  type: string;
  is_active: boolean;
  created_at: string;
}

const SpecialServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<SpecialService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailed_description: '',
    base_service_id: '',
    project_types: [] as string[],
    features: [] as string[],
    icon: '',
    color: '#3B82F6',
    is_featured: false,
    is_active: true,
    display_order: 0
  });

  const queryClient = useQueryClient();

  // Get regular services for linking
  const { data: services } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return (data || []) as Service[];
    }
  });

  // Get special services
  const { data: specialServices, isLoading } = useQuery({
    queryKey: ['special-services'],
    queryFn: async (): Promise<SpecialService[]> => {
      const { data, error } = await supabase
        .from('special_services')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return (data || []) as SpecialService[];
    }
  });

  // Default services from main page that can be linked
  const mainPageServices = [
    {
      name: "تطوير أنظمة إدارة المخزون",
      description: "أنظمة ذكية ومتطورة لإدارة المخزون والمستودعات مع تتبع دقيق للمنتجات",
      features: ["تتبع المخزون", "تقارير مفصلة", "تنبيهات ذكية", "إدارة الموردين"],
      icon: "Package",
      color: "#3B82F6"
    },
    {
      name: "تطوير تطبيقات الويب",
      description: "تصميم وتطوير تطبيقات ويب احترافية باستخدام أحدث التقنيات",
      features: ["تصميم متجاوب", "أداء عالي", "أمان متقدم", "سهولة الاستخدام"],
      icon: "Globe",
      color: "#10B981"
    },
    {
      name: "استشارات الأعمال التقنية",
      description: "استشارات متخصصة لتحسين العمليات وزيادة الكفاءة باستخدام التقنيات الحديثة",
      features: ["تحليل العمليات", "اقتراح الحلول", "خطط التطوير", "التدريب والدعم"],
      icon: "Users",
      color: "#F59E0B"
    },
    {
      name: "أنظمة الحماية السيبرانية",
      description: "حلول أمنية متطورة لحماية البيانات والأنظمة من التهديدات السيبرانية",
      features: ["مراقبة الأمان", "كشف التهديدات", "حماية البيانات", "تقارير أمنية"],
      icon: "Shield",
      color: "#EF4444"
    },
    {
      name: "أنظمة الذكاء الاصطناعي",
      description: "تطوير حلول الذكاء الاصطناعي وتعلم الآلة المتقدمة للأعمال",
      features: ["تعلم الآلة", "تحليل البيانات", "أتمتة العمليات", "توقعات ذكية"],
      icon: "Brain",
      color: "#8B5CF6"
    },
    {
      name: "تطوير التطبيقات المحمولة",
      description: "تطبيقات أصلية ومتطورة للهواتف الذكية والأجهزة اللوحية",
      features: ["تطبيقات أصلية", "تصميم حديث", "أداء سريع", "متجر التطبيقات"],
      icon: "Smartphone",
      color: "#06B6D4"
    },
    {
      name: "استشارات التحول الرقمي",
      description: "إرشاد الشركات خلال رحلة التحول الرقمي الشامل والمتطور",
      features: ["تقييم الوضع الحالي", "خطة التحول", "تدريب الفرق", "دعم مستمر"],
      icon: "Zap",
      color: "#F97316"
    },
    {
      name: "التسويق الرقمي الذكي",
      description: "حلول التسويق الرقمي المدعومة بالذكاء الاصطناعي والتحليلات المتقدمة",
      features: ["حملات ذكية", "تحليل الجمهور", "تحسين الإعلانات", "تقارير شاملة"],
      icon: "TrendingUp",
      color: "#EC4899"
    },
    {
      name: "أنظمة إدارة المحتوى",
      description: "منصات متطورة لإدارة المحتوى الرقمي والنشر الذكي",
      features: ["إدارة المحتوى", "نشر تلقائي", "تحسين SEO", "تحليلات المحتوى"],
      icon: "FileText",
      color: "#84CC16"
    }
  ];

  const predefinedProjects = [
    'أنظمة إدارة المحتوى',
    'أنظمة الحماية السيبرانية', 
    'أنظمة الذكاء الاصطناعي',
    'تطوير التطبيقات المحمولة',
    'تطوير أنظمة إدارة المخزون',
    'تطوير تطبيقات الويب',
    'استشارات الأعمال التقنية',
    'استشارات التحول الرقمي',
    'التسويق الرقمي الذكي'
  ];

  // Initialize special services if none exist
  const initializeMutation = useMutation({
    mutationFn: async () => {
      const defaultSpecialServices = mainPageServices.map((service, index) => ({
        name: service.name,
        description: service.description,
        detailed_description: `خدمة متخصصة في ${service.name} تقدم حلولاً شاملة ومتطورة لتلبية احتياجات عملك`,
        project_types: [service.name],
        features: service.features,
        icon: service.icon,
        color: service.color,
        is_featured: index < 3, // أول 3 خدمات مميزة
        is_active: true,
        display_order: index + 1
      }));

      const { error } = await supabase
        .from('special_services')
        .insert(defaultSpecialServices);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      toast({ title: "تم إضافة الخدمات الخاصة من الصفحة الرئيسية بنجاح" });
    }
  });

  // Auto-initialize if no services exist
  useEffect(() => {
    if (specialServices && specialServices.length === 0) {
      initializeMutation.mutate();
    }
  }, [specialServices]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('special_services')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      toast({ title: "تم إضافة الخدمة الخاصة بنجاح" });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const { error } = await supabase
        .from('special_services')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      toast({ title: "تم تحديث الخدمة الخاصة بنجاح" });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('special_services')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-services'] });
      toast({ title: "تم حذف الخدمة الخاصة بنجاح" });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      detailed_description: '',
      base_service_id: '',
      project_types: [],
      features: [],
      icon: '',
      color: '#3B82F6',
      is_featured: false,
      is_active: true,
      display_order: 0
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
      base_service_id: service.base_service_id || '',
      project_types: service.project_types || [],
      features: service.features || [],
      icon: service.icon || '',
      color: service.color || '#3B82F6',
      is_featured: service.is_featured || false,
      is_active: service.is_active,
      display_order: service.display_order || 0
    });
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

  const toggleProjectType = (project: string) => {
    setFormData(prev => ({
      ...prev,
      project_types: prev.project_types.includes(project)
        ? prev.project_types.filter(p => p !== project)
        : [...prev.project_types, project]
    }));
  };

  const addFeature = () => {
    const feature = prompt('أدخل ميزة جديدة:');
    if (feature) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const linkFromMainPageService = (mainService: any) => {
    setFormData({
      name: mainService.name,
      description: mainService.description,
      detailed_description: `خدمة متخصصة في ${mainService.name} تقدم حلولاً شاملة ومتطورة لتلبية احتياجات عملك`,
      base_service_id: '',
      project_types: [mainService.name],
      features: mainService.features,
      icon: mainService.icon,
      color: mainService.color,
      is_featured: false,
      is_active: true,
      display_order: (specialServices?.length || 0) + 1
    });
    setShowForm(true);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Star className="h-5 w-5" />
            إدارة الخدمات الخاصة
          </CardTitle>
          <div className="flex gap-2">
            {specialServices && specialServices.length === 0 && (
              <Button
                onClick={() => initializeMutation.mutate()}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <Link className="mr-2 h-4 w-4" />
                ربط خدمات الصفحة الرئيسية
              </Button>
            )}
            <Button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              إضافة خدمة خاصة جديدة
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Link Section */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Link className="h-5 w-5" />
              ربط سريع من خدمات الصفحة الرئيسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {mainPageServices.map((service, index) => (
                <div key={index} className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">{service.name}</h4>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: service.color }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-xs mb-3">{service.description.substring(0, 60)}...</p>
                  <Button
                    size="sm"
                    onClick={() => linkFromMainPageService(service)}
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-400 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    إضافة كخدمة خاصة
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                    <Label htmlFor="base_service_id" className="text-white">ربط بخدمة أساسية</Label>
                    <select
                      id="base_service_id"
                      value={formData.base_service_id}
                      onChange={(e) => setFormData({...formData, base_service_id: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-md"
                    >
                      <option value="">اختر خدمة أساسية</option>
                      {services?.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
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

                <div>
                  <Label className="text-white mb-2 block">المشاريع المرتبطة</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {predefinedProjects.map((project) => (
                      <label key={project} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.project_types.includes(project)}
                          onChange={() => toggleProjectType(project)}
                          className="rounded"
                        />
                        <span className="text-gray-300">{project}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">الميزات</Label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-gray-300 flex-1">{feature}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addFeature}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      إضافة ميزة
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="icon" className="text-white">أيقونة (اسم lucide)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      className="bg-gray-600 border-gray-500 text-white"
                      placeholder="مثال: Star, Shield, Zap"
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
                
                <div className="flex items-center gap-4">
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
                    <Label htmlFor="is_active" className="text-white">خدمة نشطة</Label>
                  </div>
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
          ) : specialServices?.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">لا توجد خدمات خاصة حالياً</div>
              <Button
                onClick={() => initializeMutation.mutate()}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                إضافة الخدمات الافتراضية
              </Button>
            </div>
          ) : (
            specialServices?.map((service) => (
              <Card key={service.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
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
                        {service.base_service_id && (
                          <Badge variant="outline" className="text-xs">
                            <Link className="h-3 w-3 mr-1" />
                            مرتبطة
                          </Badge>
                        )}
                      </div>
                      {service.description && (
                        <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                      )}
                      {service.project_types && service.project_types.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {service.project_types.map((project: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {service.features && service.features.length > 0 && (
                        <div className="text-xs text-gray-400">
                          الميزات: {service.features.join(', ')}
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
