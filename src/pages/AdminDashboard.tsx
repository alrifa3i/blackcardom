
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Save, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');

  // Services Management
  const [services, setServices] = useState([
    {
      id: 1,
      title: "تطوير التطبيقات",
      description: "تطوير تطبيقات ويب وموبايل متطورة",
      price: "من 2000 ريال",
      image: "/placeholder.svg",
      features: ["React & Node.js", "Flutter & React Native"]
    }
  ]);

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    features: ''
  });

  // Products Management
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "نظام إدارة المشاريع",
      description: "نظام متكامل لإدارة المشاريع",
      price: "5000 ريال",
      rating: 4.9,
      downloads: "2.5K",
      demoUrl: "https://demo.project-manager.com"
    }
  ]);

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    demoUrl: '',
    features: ''
  });

  // Projects Management
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "منصة الحكومة الرقمية",
      country: "سلطنة عُمان",
      date: "2024",
      description: "منصة حكومية متكاملة",
      status: "مكتمل",
      category: "حكومي",
      projectUrl: "https://gov-platform.om",
      logo: "/placeholder.svg"
    }
  ]);

  const [projectForm, setProjectForm] = useState({
    name: '',
    country: '',
    date: '',
    description: '',
    status: '',
    category: '',
    projectUrl: '',
    logo: ''
  });

  // Contact Settings
  const [contactSettings, setContactSettings] = useState({
    email: 'info@theblack-card.com',
    phone: '+968 9XXX XXXX',
    address: 'مسقط، سلطنة عُمان',
    workingHours: 'الأحد - الخميس: 8:00 - 17:00'
  });

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService = {
      id: Date.now(),
      ...serviceForm,
      features: serviceForm.features.split(',').map(f => f.trim())
    };
    setServices([...services, newService]);
    setServiceForm({ title: '', description: '', price: '', image: '', features: '' });
    toast({ title: "تم إضافة الخدمة بنجاح" });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...productForm,
      rating: 0,
      downloads: "0",
      features: productForm.features.split(',').map(f => f.trim())
    };
    setProducts([...products, newProduct]);
    setProductForm({ title: '', description: '', price: '', demoUrl: '', features: '' });
    toast({ title: "تم إضافة المنتج بنجاح" });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      ...projectForm
    };
    setProjects([...projects, newProject]);
    setProjectForm({ name: '', country: '', date: '', description: '', status: '', category: '', projectUrl: '', logo: '' });
    toast({ title: "تم إضافة المشروع بنجاح" });
  };

  const handleContactUpdate = () => {
    toast({ title: "تم تحديث معلومات التواصل بنجاح" });
  };

  const openPayPal = (price: string) => {
    // PayPal integration with provided credentials
    const paypalUrl = `https://www.paypal.com/checkoutnow?token=AbbCtePdaGiT_0SyfFgLjcJxR75XjaoF5ODOPMbYb-du_QDalqRkIVuj85laQmc0ceYnkjwYoAtN4xwP&amount=${price}`;
    window.open(paypalUrl, '_blank');
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast({ title: "تم حذف الخدمة بنجاح" });
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({ title: "تم حذف المنتج بنجاح" });
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({ title: "تم حذف المشروع بنجاح" });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">لوحة تحكم The Black Card</h1>
            <p className="text-gray-300">إدارة شاملة لموقع الشركة</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              العودة للموقع
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900 border border-gray-700">
            <TabsTrigger value="services" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">إدارة الخدمات</TabsTrigger>
            <TabsTrigger value="products" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">إدارة المنتجات</TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">إدارة المشاريع</TabsTrigger>
            <TabsTrigger value="contact" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">معلومات التواصل</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">التحليلات</TabsTrigger>
          </TabsList>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Plus className="mr-2 h-5 w-5" />
                  إضافة خدمة جديدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="عنوان الخدمة"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Input
                      placeholder="السعر (مثال: من 2000 ريال)"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <Textarea
                    placeholder="وصف الخدمة"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                    required
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="رابط الصورة"
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({...serviceForm, image: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="المميزات (افصل بينها بفاصلة)"
                    value={serviceForm.features}
                    onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-400">
                    <Save className="mr-2 h-4 w-4" />
                    إضافة الخدمة
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">الخدمات الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">{service.title}</h3>
                        <p className="text-gray-300">{service.description}</p>
                        <Badge className="mt-2 bg-yellow-500 text-black">{service.price}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openPayPal(service.price)}
                          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                        >
                          اختبار الدفع
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Management */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Plus className="mr-2 h-5 w-5" />
                  إضافة منتج جديد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="اسم المنتج"
                      value={productForm.title}
                      onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Input
                      placeholder="السعر"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <Textarea
                    placeholder="وصف المنتج"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    required
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="رابط العرض التوضيحي"
                    value={productForm.demoUrl}
                    onChange={(e) => setProductForm({...productForm, demoUrl: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="المميزات (افصل بينها بفاصلة)"
                    value={productForm.features}
                    onChange={(e) => setProductForm({...productForm, features: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-400">
                    <Save className="mr-2 h-4 w-4" />
                    إضافة المنتج
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">المنتجات الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">{product.title}</h3>
                        <p className="text-gray-300">{product.description}</p>
                        <Badge className="mt-2 bg-yellow-500 text-black">{product.price}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(product.demoUrl, '_blank')}
                          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Management */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  إضافة مشروع جديد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="اسم المشروع"
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="دولة المشروع"
                      value={projectForm.country}
                      onChange={(e) => setProjectForm({...projectForm, country: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="تاريخ المشروع"
                      value={projectForm.date}
                      onChange={(e) => setProjectForm({...projectForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="حالة المشروع"
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="تصنيف المشروع"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="وصف المشروع"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="رابط المشروع"
                      value={projectForm.projectUrl}
                      onChange={(e) => setProjectForm({...projectForm, projectUrl: e.target.value})}
                    />
                    <Input
                      placeholder="رابط شعار المشروع"
                      value={projectForm.logo}
                      onChange={(e) => setProjectForm({...projectForm, logo: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="bg-black text-white">
                    <Save className="mr-2 h-4 w-4" />
                    إضافة المشروع
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المشاريع الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-gray-600">{project.description}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge>{project.status}</Badge>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(project.projectUrl, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تحديث معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="البريد الإلكتروني"
                  value={contactSettings.email}
                  onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})}
                />
                <Input
                  placeholder="رقم الهاتف"
                  value={contactSettings.phone}
                  onChange={(e) => setContactSettings({...contactSettings, phone: e.target.value})}
                />
                <Input
                  placeholder="العنوان"
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings({...contactSettings, address: e.target.value})}
                />
                <Input
                  placeholder="ساعات العمل"
                  value={contactSettings.workingHours}
                  onChange={(e) => setContactSettings({...contactSettings, workingHours: e.target.value})}
                />
                <Button onClick={handleContactUpdate} className="bg-black text-white">
                  <Save className="mr-2 h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-500">150+</div>
                  <p className="text-gray-300">إجمالي الزوار</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-500">25</div>
                  <p className="text-gray-300">طلبات الخدمات</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-500">12</div>
                  <p className="text-gray-300">مبيعات المنتجات</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-500">85%</div>
                  <p className="text-gray-300">معدل الرضا</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
