import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Users, 
  Package, 
  FolderOpen, 
  Mail, 
  CreditCard, 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  Save,
  Upload,
  Globe,
  Star,
  Download,
  LogOut,
  Home
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import AdminAuth from '@/components/AdminAuth';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // States for different sections
  const [services, setServices] = useState([
    {
      id: 1,
      title: "استشارات الأعمال التقنية",
      description: "نقدم استشارات متخصصة لتحسين العمليات وزيادة الكفاءة",
      price: "25 ريال عُماني/ساعة",
      image: "/placeholder.svg",
      features: ["تحليل العمليات", "اقتراح الحلول", "خطط التطوير", "التدريب والدعم"]
    }
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "نظام إدارة المخزون الذكي",
      description: "نظام متطور لإدارة المخزون مع تتبع المنتجات والتنبيهات التلقائية",
      price: "400 ريال عُماني",
      downloads: "1,200+",
      rating: 4.8,
      category: "إدارة أعمال",
      demoUrl: "https://inventory-demo.theblack-card.com",
      image: "/placeholder.svg"
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "نظام إدارة سلسلة التوريد",
      country: "الرياض، المملكة العربية السعودية",
      date: "2024",
      description: "نظام متطور لإدارة سلسلة التوريد يشمل تتبع المخزون والتوزيع",
      status: "قيد التطوير",
      technologies: ["AI/ML", "MongoDB", "Python", "Angular"],
      achievements: ["تقليل التكاليف %25", "تحسين التسليم %30", "نقص الفقد %90"],
      projectUrl: "https://supply-management.sa",
      logo: "/placeholder.svg"
    }
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "خدمة",
      title: "طلب استشارة تقنية",
      clientName: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+968 9XXX XXXX",
      description: "نحتاج استشارة لتطوير نظام إدارة المخزون",
      status: "جديد",
      date: "2024-01-15"
    },
    {
      id: 2,
      type: "منتج",
      title: "طلب شراء نظام CRM",
      clientName: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+968 9XXX XXXX",
      description: "نريد شراء نظام إدارة العملاء",
      status: "قيد المراجعة",
      date: "2024-01-14"
    }
  ]);

  const [paypalSettings, setPaypalSettings] = useState({
    clientId: "AbbCtePdaGiT_0SyfFgLjcJxR75XjaoF5ODOPMbYb-du_QDalqRkIVuj85laQmc0ceYnkjwYoAtN4xwP",
    secretKey: "EHeFTszAxK2eCuDEKvqOD_qCmHLuMUNg_ZMjDK8zazxGqTz8ve_sHOaZvbkg7gaUl1Updm6zL3bkNgLX",
    appName: "The Black Card",
    email: "info@theblack-card.com"
  });

  const [contactInfo, setContactInfo] = useState({
    email: "info@theblack-card.com",
    phone: "+968 9XXX XXXX",
    address: "مسقط، سلطنة عُمان",
    workingHours: "الأحد - الخميس: 8:00 - 17:00"
  });

  // Form states
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    features: ['']
  });

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    demoUrl: '',
    image: ''
  });

  const [newProject, setNewProject] = useState({
    name: '',
    country: '',
    date: '',
    description: '',
    status: '',
    technologies: [''],
    achievements: [''],
    projectUrl: '',
    logo: ''
  });

  // Handle form submissions
  const handleAddService = () => {
    const service = {
      id: services.length + 1,
      ...newService,
      features: newService.features.filter(f => f.trim() !== '')
    };
    setServices([...services, service]);
    setNewService({ title: '', description: '', price: '', image: '', features: [''] });
    toast({ title: "تم إضافة الخدمة بنجاح" });
  };

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      ...newProduct,
      downloads: "0+",
      rating: 0
    };
    setProducts([...products, product]);
    setNewProduct({ title: '', description: '', price: '', category: '', demoUrl: '', image: '' });
    toast({ title: "تم إضافة المنتج بنجاح" });
  };

  const handleAddProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      technologies: newProject.technologies.filter(t => t.trim() !== ''),
      achievements: newProject.achievements.filter(a => a.trim() !== '')
    };
    setProjects([...projects, project]);
    setNewProject({ 
      name: '', 
      country: '', 
      date: '', 
      description: '', 
      status: '', 
      technologies: [''], 
      achievements: [''], 
      projectUrl: '', 
      logo: '' 
    });
    toast({ title: "تم إضافة المشروع بنجاح" });
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast({ title: "تم حذف الخدمة بنجاح" });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: "تم حذف المنتج بنجاح" });
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({ title: "تم حذف المشروع بنجاح" });
  };

  const handleSavePaypalSettings = () => {
    toast({ title: "تم حفظ إعدادات PayPal بنجاح" });
  };

  const handleSaveContactInfo = () => {
    toast({ title: "تم حفظ معلومات التواصل بنجاح" });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    toast({ title: "تم تسجيل الخروج بنجاح" });
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">لوحة التحكم الإدارية</h1>
            <p className="text-gray-400">إدارة شاملة لموقع The Black Card</p>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <Home className="h-4 w-4 mr-2" />
                العودة للرئيسية
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل خروج
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-900">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الخدمات
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              المشاريع
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              التواصل
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              المدفوعات
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">الطلبات الجديدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">
                    {requests.filter(r => r.status === 'جديد').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">إجمالي الخدمات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">{services.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">إجمالي المنتجات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">{products.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">إجمالي المشاريع</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">{projects.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">المشاريع المكتملة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">
                    {projects.filter(p => p.status === 'مكتمل').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">طلبات العملاء</CardTitle>
                <p className="text-gray-400">إدارة جميع الطلبات الواردة من العملاء</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id} className="bg-gray-800 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">{request.title}</h3>
                            <p className="text-gray-300 text-sm">{request.clientName} - {request.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${
                              request.status === 'جديد' ? 'bg-red-500' :
                              request.status === 'قيد المراجعة' ? 'bg-yellow-500' : 'bg-green-500'
                            } text-white`}>
                              {request.status}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {request.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-3">{request.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{request.date}</span>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-500">
                              رد
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600">
                              تفاصيل
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  إضافة خدمة جديدة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="عنوان الخدمة"
                    value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="السعر (مثال: 25 ريال عُماني/ساعة)"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Textarea
                  placeholder="وصف الخدمة"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <div className="space-y-2">
                  <label className="text-white text-sm">المميزات الرئيسية:</label>
                  {newService.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`المميزة ${index + 1}`}
                        value={feature}
                        onChange={(e) => {
                          const updated = [...newService.features];
                          updated[index] = e.target.value;
                          setNewService({...newService, features: updated});
                        }}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      {index === newService.features.length - 1 && (
                        <Button
                          size="sm"
                          onClick={() => setNewService({...newService, features: [...newService.features, '']})}
                          className="bg-yellow-500 text-black hover:bg-yellow-400"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button onClick={handleAddService} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ الخدمة
                </Button>
              </CardContent>
            </Card>

            {/* Services List */}
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-300 mb-2">{service.description}</p>
                        <Badge className="bg-yellow-500 text-black">{service.price}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  إضافة منتج جديد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="اسم المنتج"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="السعر (مثال: 400 ريال عُماني)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="إدارة أعمال">إدارة أعمال</SelectItem>
                      <SelectItem value="موارد بشرية">موارد بشرية</SelectItem>
                      <SelectItem value="تجارة إلكترونية">تجارة إلكترونية</SelectItem>
                      <SelectItem value="إدارة محتوى">إدارة محتوى</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="رابط المعاينة"
                    value={newProduct.demoUrl}
                    onChange={(e) => setNewProduct({...newProduct, demoUrl: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Textarea
                  placeholder="وصف المنتج"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button onClick={handleAddProduct} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ المنتج
                </Button>
              </CardContent>
            </Card>

            {/* Products List */}
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{product.title}</h3>
                        <p className="text-gray-300 mb-2">{product.description}</p>
                        <div className="flex gap-2 mb-2">
                          <Badge className="bg-green-500 text-white">{product.category}</Badge>
                          <Badge className="bg-yellow-500 text-black">{product.price}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {product.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  إضافة مشروع جديد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="اسم المشروع"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="الدولة"
                    value={newProject.country}
                    onChange={(e) => setNewProject({...newProject, country: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="تاريخ المشروع"
                    value={newProject.date}
                    onChange={(e) => setNewProject({...newProject, date: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="حالة المشروع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مكتمل">مكتمل</SelectItem>
                      <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
                      <SelectItem value="حكومي">حكومي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="رابط المشروع"
                  value={newProject.projectUrl}
                  onChange={(e) => setNewProject({...newProject, projectUrl: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Textarea
                  placeholder="وصف المشروع"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button onClick={handleAddProject} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ المشروع
                </Button>
              </CardContent>
            </Card>

            {/* Projects List */}
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                        <p className="text-gray-300 mb-2">{project.description}</p>
                        <div className="flex gap-2 mb-2">
                          <Badge className="bg-blue-500 text-white">{project.status}</Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">{project.country}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">إعدادات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">البريد الإلكتروني</label>
                    <Input
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">رقم الهاتف</label>
                    <Input
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">العنوان</label>
                  <Input
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">ساعات العمل</label>
                  <Input
                    value={contactInfo.workingHours}
                    onChange={(e) => setContactInfo({...contactInfo, workingHours: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button onClick={handleSaveContactInfo} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">إعدادات PayPal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">اسم التطبيق</label>
                  <Input
                    value={paypalSettings.appName}
                    onChange={(e) => setPaypalSettings({...paypalSettings, appName: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">Client ID</label>
                  <Input
                    value={paypalSettings.clientId}
                    onChange={(e) => setPaypalSettings({...paypalSettings, clientId: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">Secret Key</label>
                  <Input
                    type="password"
                    value={paypalSettings.secretKey}
                    onChange={(e) => setPaypalSettings({...paypalSettings, secretKey: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">البريد الإلكتروني الأساسي</label>
                  <Input
                    value={paypalSettings.email}
                    onChange={(e) => setPaypalSettings({...paypalSettings, email: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button onClick={handleSavePaypalSettings} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Save className="h-4 w-4 mr-2" />
                  حفظ إعدادات PayPal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

</initial_code>
