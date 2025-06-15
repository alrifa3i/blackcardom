
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Calendar, ExternalLink, Users, Zap, Shield, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';
import ProjectViewer from './ProjectViewer';

const ProjectsSection = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{url: string, title: string} | null>(null);

  const projects = [
    {
      id: 1,
      name: "نظام إدارة سلسلة التوريد",
      country: "الرياض، المملكة العربية السعودية",
      date: "2024",
      description: "نظام متطور لإدارة سلسلة التوريد يشمل تتبع المخزون والتوزيع والتحليلات الذكية",
      status: "مكتمل",
      technologies: ["AI/ML", "MongoDB", "Python", "Angular"],
      achievements: [
        "تقليل التكاليف بنسبة 25%",
        "تحسين سرعة التسليم بنسبة 30%",
        "تقليل نسبة الفقد بنسبة 90%"
      ],
      projectUrl: "https://supply-management.sa",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "500+",
        efficiency: "95%",
        satisfaction: "4.9/5"
      },
      isVisible: true
    },
    {
      id: 2,
      name: "منصة التجارة الإلكترونية المتكاملة",
      country: "الكويت، دولة الكويت",
      date: "2023",
      description: "منصة تجارة إلكترونية شاملة مع نظام دفع متطور وإدارة المخزون والتحليلات",
      status: "مكتمل",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      achievements: [
        "زيادة المبيعات بنسبة 150%",
        "تحسين تجربة المستخدم بنسبة 40%",
        "معدل تحويل عالي 8.5%"
      ],
      projectUrl: "https://ecommerce-kuwait.com",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "2,000+",
        efficiency: "98%",
        satisfaction: "4.8/5"
      },
      isVisible: true
    },
    {
      id: 3,
      name: "تطبيق إدارة المطاعم الذكي",
      country: "دبي، دولة الإمارات العربية المتحدة",
      date: "2023",
      description: "تطبيق شامل لإدارة المطاعم يشمل الطلبات والمخزون والموظفين والتقارير المالية",
      status: "قيد التطوير",
      technologies: ["Flutter", "Firebase", "Node.js", "Express"],
      achievements: [
        "تقليل وقت الخدمة بنسبة 35%",
        "تحسين إدارة المخزون بنسبة 50%",
        "زيادة رضا العملاء بنسبة 45%"
      ],
      projectUrl: "https://restaurant-app.ae",
      logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "300+",
        efficiency: "92%",
        satisfaction: "4.7/5"
      },
      isVisible: true
    },
    {
      id: 4,
      name: "منصة التعليم الإلكتروني",
      country: "مسقط، سلطنة عُمان",
      date: "2024",
      description: "منصة تعليمية متطورة مع فصول افتراضية وتتبع التقدم وأدوات تفاعلية",
      status: "مكتمل",
      technologies: ["React", "WebRTC", "MongoDB", "AWS"],
      achievements: [
        "تحسين نتائج الطلاب بنسبة 60%",
        "زيادة التفاعل بنسبة 80%",
        "توفير 40% من التكاليف التشغيلية"
      ],
      projectUrl: "https://elearning-oman.com",
      logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "1,500+",
        efficiency: "96%",
        satisfaction: "4.8/5"
      },
      isVisible: true
    },
    {
      id: 5,
      name: "نظام إدارة المستشفى الذكي",
      country: "الدوحة، دولة قطر",
      date: "2024",
      description: "نظام شامل لإدارة المستشفيات مع السجلات الطبية الإلكترونية وجدولة المواعيد",
      status: "مكتمل",
      technologies: ["Angular", "Spring Boot", "MySQL", "HL7"],
      achievements: [
        "تقليل أوقات الانتظار بنسبة 50%",
        "تحسين دقة التشخيص بنسبة 30%",
        "زيادة كفاءة الموظفين بنسبة 45%"
      ],
      projectUrl: "https://hospital-qatar.com",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "800+",
        efficiency: "94%",
        satisfaction: "4.9/5"
      },
      isVisible: true
    },
    {
      id: 6,
      name: "تطبيق الخدمات الحكومية",
      country: "المنامة، مملكة البحرين",
      date: "2023",
      description: "تطبيق موحد للخدمات الحكومية مع معالجة ذكية للطلبات ودفع إلكتروني",
      status: "مكتمل",
      technologies: ["Vue.js", "Django", "PostgreSQL", "Blockchain"],
      achievements: [
        "تقليل وقت المعالجة بنسبة 70%",
        "زيادة رضا المواطنين بنسبة 85%",
        "توفير 60% من التكاليف الإدارية"
      ],
      projectUrl: "https://gov-services-bh.com",
      logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "50,000+",
        efficiency: "97%",
        satisfaction: "4.7/5"
      },
      isVisible: true
    },
    {
      id: 7,
      name: "منصة التمويل الرقمي",
      country: "أبوظبي، دولة الإمارات العربية المتحدة",
      date: "2024",
      description: "منصة مالية رقمية متطورة للخدمات المصرفية والاستثمار مع الذكاء الاصطناعي",
      status: "قيد التطوير",
      technologies: ["React Native", "Microservices", "Docker", "AI/ML"],
      achievements: [
        "معالجة أسرع للمعاملات بنسبة 80%",
        "تحسين الأمان بنسبة 95%",
        "زيادة قاعدة المستخدمين بنسبة 200%"
      ],
      projectUrl: "https://fintech-uae.com",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "5,000+",
        efficiency: "93%",
        satisfaction: "4.6/5"
      },
      isVisible: true
    },
    {
      id: 8,
      name: "نظام إدارة النقل الذكي",
      country: "الرياض، المملكة العربية السعودية",
      date: "2023",
      description: "نظام متطور لإدارة النقل العام مع تتبع المركبات وتحسين المسارات",
      status: "مكتمل",
      technologies: ["IoT", "React", "Python", "GPS Tracking"],
      achievements: [
        "تحسين كفاءة النقل بنسبة 40%",
        "تقليل الازدحام بنسبة 30%",
        "زيادة رضا الركاب بنسبة 55%"
      ],
      projectUrl: "https://transport-sa.com",
      logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "10,000+",
        efficiency: "91%",
        satisfaction: "4.5/5"
      },
      isVisible: true
    },
    {
      id: 9,
      name: "منصة إدارة الطاقة الذكية",
      country: "مسقط، سلطنة عُمان",
      date: "2024",
      description: "نظام ذكي لمراقبة وإدارة استهلاك الطاقة في المباني والمنشآت",
      status: "قيد التطوير",
      technologies: ["IoT", "Machine Learning", "React", "InfluxDB"],
      achievements: [
        "توفير 35% من استهلاك الطاقة",
        "تحسين الكفاءة بنسبة 50%",
        "تقليل الانبعاثات بنسبة 25%"
      ],
      projectUrl: "https://smart-energy-oman.com",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80",
      stats: {
        users: "200+",
        efficiency: "89%",
        satisfaction: "4.8/5"
      },
      isVisible: true
    }
  ];

  const handleViewProject = (url: string, title: string) => {
    if (url && title) {
      setSelectedProject({ url, title });
      setIsViewerOpen(true);
    }
  };

  const visibleProjects = projects.filter(project => project.isVisible);
  const displayedProjects = showMore ? visibleProjects : visibleProjects.slice(0, 3);

  return (
    <>
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">مشاريعنا</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">مشاريع نفخر بإنجازها</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              استكشف مجموعة من المشاريع الناجحة التي طورناها لعملائنا في مختلف القطاعات
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <Card key={project.id} className="modern-card border-0 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
                    </div>
                    <Badge className={`${
                      project.status === 'مكتمل' ? 'bg-green-500' : 'bg-blue-500'
                    } text-white`}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                    {project.name}
                  </CardTitle>
                  <div className="flex items-center text-gray-300 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{project.country}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{project.date}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* إحصائيات المشروع */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg">
                    <div className="text-center">
                      <Users className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{project.stats.users}</div>
                      <div className="text-xs text-gray-400">مستخدم</div>
                    </div>
                    <div className="text-center">
                      <Zap className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{project.stats.efficiency}</div>
                      <div className="text-xs text-gray-400">كفاءة</div>
                    </div>
                    <div className="text-center">
                      <Shield className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{project.stats.satisfaction}</div>
                      <div className="text-xs text-gray-400">تقييم</div>
                    </div>
                  </div>

                  {/* التقنيات المستخدمة */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">التقنيات المستخدمة:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* الإنجازات */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">الإنجازات الرئيسية:</h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-xs text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* أزرار العمل */}
                  <div className="flex gap-2 pt-4">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400"
                      onClick={() => setShowServiceForm(true)}
                    >
                      طلب خدمة مماثلة
                      <ArrowRight className="mr-1 h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-600 text-white hover:bg-gray-700"
                      onClick={() => handleViewProject(project.projectUrl, project.name)}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      عرض
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleProjects.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowMore(!showMore)}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                {showMore ? (
                  <>
                    عرض أقل
                    <ChevronUp className="mr-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    استكشاف المزيد
                    <ChevronDown className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 border border-yellow-500/20 rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                لديك مشروع مشابه؟
              </h3>
              <p className="text-gray-300 mb-6">
                دعنا نحول فكرتك إلى واقع رقمي مبهر. تواصل معنا اليوم واحصل على استشارة مجانية
              </p>
              <Button 
                size="lg" 
                className="bg-yellow-500 text-black hover:bg-yellow-400"
                onClick={() => setShowServiceForm(true)}
              >
                ابدأ مشروعك الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceRequestForm 
        isOpen={showServiceForm} 
        onClose={() => setShowServiceForm(false)} 
      />

      {selectedProject && (
        <ProjectViewer
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          url={selectedProject.url}
          title={selectedProject.title}
        />
      )}
    </>
  );
};

export default ProjectsSection;

