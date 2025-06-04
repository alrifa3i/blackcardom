
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Calendar, MapPin, Eye, Code, Award } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      logo: "/placeholder.svg",
      name: "نظام إدارة سلسلة التوريد",
      country: "الرياض، المملكة العربية السعودية",
      date: "2024",
      description: "نظام متطور لإدارة سلسلة التوريد يشمل تتبع المخزون والتوزيع وإدارة الموردين وتحليلات الذكاء الاصطناعي",
      status: "قيد التطوير",
      category: "إدارة التوريد",
      technologies: ["AI/ML", "MongoDB", "Python", "Angular"],
      achievements: ["تقليل التكاليف %25", "تحسين التسليم %30", "نقص الفقد %90"],
      projectUrl: "https://supply-management.sa",
      featured: false
    },
    {
      logo: "/placeholder.svg",
      name: "منصة التعليم الإلكتروني الجامعية",
      country: "دبي، الإمارات العربية المتحدة",
      date: "2023",
      description: "منصة تعليمية شاملة للجامعات تتضمن إدارة الدورات الإلكترونية والمحاضرات التفاعلية والتقييم والاستيفاق",
      status: "مكتمل",
      category: "تعليمي",
      technologies: ["Docker", "MySQL", "Laravel", "Vue.js"],
      achievements: ["+10,000 طالب مسجل", "معدل إكمال %85", "تقييم 4.8/5"],
      projectUrl: "https://university-learning.ae",
      featured: true
    },
    {
      logo: "/placeholder.svg",
      name: "نظام إدارة المستشفيات الذكي",
      country: "مسقط، سلطنة عُمان",
      date: "2024",
      description: "نظام متكامل لإدارة المستشفيات يشمل إدارة المرضى والمواعيد الصيدلية والتقارير الطبية",
      status: "مكتمل",
      category: "صحي",
      technologies: ["AWS", "PostgreSQL", "Node.js", "React"],
      achievements: ["تحسين الكفاءة %40", "تقليل وقت الانتظار %60", "رضا المرضى %95"],
      projectUrl: "https://hospital-system.om",
      featured: false
    },
    {
      logo: "/placeholder.svg",
      name: "منصة التجارة الإلكترونية المتقدمة",
      country: "الكويت، دولة الكويت",
      date: "2023",
      description: "منصة تجارة إلكترونية شاملة مع نظام دفع متطور وإدارة المخزون وتحليلات المبيعات",
      status: "مكتمل",
      category: "تجاري",
      technologies: ["Stripe", "Redis", "Next.js", "TypeScript"],
      achievements: ["زيادة المبيعات %150", "+5,000 عميل", "معالجة 100k طلب"],
      projectUrl: "https://ecommerce-platform.kw",
      featured: true
    },
    {
      logo: "/placeholder.svg",
      name: "نظام إدارة الموارد الحكومية",
      country: "الدوحة، دولة قطر",
      date: "2024",
      description: "نظام حكومي لإدارة الموارد والخدمات العامة مع واجهات للمواطنين والموظفين",
      status: "حكومي",
      category: "حكومي",
      technologies: ["Blockchain", "Oracle", "Java", "Spring"],
      achievements: ["تسريع الخدمات %70", "شفافية كاملة", "رقمنة 50 خدمة"],
      projectUrl: "https://gov-resources.qa",
      featured: false
    },
    {
      logo: "/placeholder.svg",
      name: "تطبيق إدارة الصحة الشخصية",
      country: "المنامة، مملكة البحرين",
      date: "2023",
      description: "تطبيق محمول لتتبع الصحة الشخصية مع ربط أجهزة القياس والاستشارات الطبية عن بُعد",
      status: "مكتمل",
      category: "صحي",
      technologies: ["Flutter", "Firebase", "TensorFlow", "IoT"],
      achievements: ["+50,000 مستخدم", "دقة التشخيص %92", "توفير %40 في التكاليف"],
      projectUrl: "https://health-tracker.bh",
      featured: true
    },
    {
      logo: "/placeholder.svg",
      name: "نظام إدارة الشحن واللوجستيات",
      country: "أبوظبي، الإمارات العربية المتحدة",
      date: "2024",
      description: "منصة متكاملة لإدارة عمليات الشحن والتتبع اللحظي للطرود والإدارة اللوجستية",
      status: "قيد التطوير",
      category: "لوجستيات",
      technologies: ["GPS", "Node.js", "React Native", "MongoDB"],
      achievements: ["تقليل وقت التسليم %45", "تتبع دقيق %99", "رضا العملاء %94"],
      projectUrl: "https://logistics-system.ae",
      featured: false
    },
    {
      logo: "/placeholder.svg",
      name: "منصة التمويل الجماعي الإسلامي",
      country: "جدة، المملكة العربية السعودية",
      date: "2023",
      description: "منصة مبتكرة للتمويل الجماعي المتوافق مع أحكام الشريعة الإسلامية لدعم المشاريع الناشئة",
      status: "مكتمل",
      category: "مالي",
      technologies: ["Blockchain", "React", "Python", "PostgreSQL"],
      achievements: ["تمويل +200 مشروع", "جمع 50M ريال", "معدل نجاح %87"],
      projectUrl: "https://islamic-crowdfunding.sa",
      featured: true
    },
    {
      logo: "/placeholder.svg",
      name: "نظام إدارة الفعاليات والمؤتمرات",
      country: "مسقط، سلطنة عُمان",
      date: "2024",
      description: "منصة شاملة لإدارة الفعاليات والمؤتمرات مع نظام تسجيل وإدارة الحضور والمحتوى",
      status: "مكتمل",
      category: "فعاليات",
      technologies: ["Vue.js", "Laravel", "WebRTC", "MySQL"],
      achievements: ["إدارة +100 فعالية", "حضور +25,000 شخص", "تقييم 4.9/5"],
      projectUrl: "https://events-management.om",
      featured: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500 text-white';
      case 'قيد التطوير': return 'bg-yellow-500 text-black';
      case 'حكومي': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const openProject = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-500 text-black">مشاريعنا المميزة</Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">إنجازات نفخر بها</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            مجموعة مختارة من أبرز مشاريعنا الناجحة التي حققت تأثيراً إيجابياً في مختلف القطاعات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="project-card group border-0 shadow-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Project Image/Preview Area */}
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="text-center text-gray-400">
                  <div className="text-xs mb-2">Drop your images here or Browse</div>
                  {/* Project Logo */}
                  <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-xs">LOGO</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-white">{project.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-400 space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Achievements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center text-white text-sm">
                    <Award className="h-4 w-4 mr-2" />
                    الإنجازات الرئيسية
                  </h4>
                  <div className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all"
                  onClick={() => openProject(project.projectUrl)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  عرض المشروع
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
            عرض جميع المشاريع
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
