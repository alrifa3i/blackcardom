
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Calendar, MapPin, Eye, Code, Award } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      logo: "/placeholder.svg",
      name: "منصة الحكومة الرقمية",
      country: "سلطنة عُمان",
      date: "2024",
      description: "منصة حكومية متكاملة لتقديم الخدمات الإلكترونية للمواطنين مع نظام دفع آمن وواجهة مستخدم متطورة",
      status: "مكتمل",
      category: "حكومي",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      achievements: ["تحسين 85% في سرعة الخدمات", "3M+ مستخدم نشط", "99.9% وقت تشغيل"],
      projectUrl: "https://gov-platform.om",
      featured: true
    },
    {
      logo: "/placeholder.svg",
      name: "تطبيق التجارة الذكية",
      country: "الإمارات العربية المتحدة",
      date: "2024",
      description: "تطبيق متكامل للتجارة الإلكترونية مع ذكاء اصطناعي لتحليل سلوك المستهلكين وتحسين تجربة التسوق",
      status: "قيد التطوير",
      category: "تجاري",
      technologies: ["Flutter", "Python", "MongoDB", "AI/ML"],
      achievements: ["50% زيادة في المبيعات", "تقليل 30% في وقت التسوق", "تقييم 4.8/5"],
      projectUrl: "https://smart-commerce.ae",
      featured: false
    },
    {
      logo: "/placeholder.svg",
      name: "نظام إدارة المستشفيات",
      country: "المملكة العربية السعودية",
      date: "2023",
      description: "نظام شامل لإدارة المستشفيات يشمل إدارة المرضى والمواعيد والفواتير والتقارير الطبية",
      status: "مكتمل",
      category: "طبي",
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
      achievements: ["تحسين 60% في كفاءة العمليات", "تقليل 40% في الأخطاء", "رضا 95% من المستخدمين"],
      projectUrl: "https://hospital-management.sa",
      featured: true
    },
    {
      logo: "/placeholder.svg",
      name: "منصة التعليم الافتراضي",
      country: "دولة الكويت",
      date: "2023",
      description: "منصة تعليمية متطورة تدعم التعلم الافتراضي مع أدوات تفاعلية وتقييم ذكي للطلاب",
      status: "مكتمل",
      category: "تعليمي",
      technologies: ["React Native", "Express.js", "Redis", "WebRTC"],
      achievements: ["100K+ طالب مسجل", "تحسين 70% في النتائج", "توفير 50% في التكاليف"],
      projectUrl: "https://virtual-education.kw",
      featured: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'قيد التطوير': return 'bg-yellow-100 text-yellow-800';
      case 'حكومي': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'حكومي': return 'bg-blue-100 text-blue-800';
      case 'تجاري': return 'bg-purple-100 text-purple-800';
      case 'طبي': return 'bg-red-100 text-red-800';
      case 'تعليمي': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openProject = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white">مشاريعنا المميزة</Badge>
          <h2 className="text-4xl font-bold mb-4">إنجازات نفخر بها</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة مختارة من أبرز مشاريعنا الناجحة التي حققت تأثيراً إيجابياً في مختلف القطاعات
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className={`service-card group border-0 shadow-xl overflow-hidden ${project.featured ? 'ring-2 ring-yellow-500' : ''}`}>
              {project.featured && (
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-2 font-semibold">
                  <Award className="inline-block h-4 w-4 mr-2" />
                  مشروع مميز
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={project.logo} 
                    alt={project.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-2">{project.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{project.country}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                </div>
                
                <p className="text-gray-600">{project.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    التقنيات المستخدمة
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    الإنجازات الرئيسية
                  </h4>
                  <div className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black transition-all"
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
          <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
            عرض جميع المشاريع
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
