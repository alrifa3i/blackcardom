
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Calendar, ExternalLink, Users, Zap, Shield, Globe } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';

const ProjectsSection = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);

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
      logo: "/placeholder.svg",
      stats: {
        users: "500+",
        efficiency: "95%",
        satisfaction: "4.9/5"
      }
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
      logo: "/placeholder.svg",
      stats: {
        users: "2,000+",
        efficiency: "98%",
        satisfaction: "4.8/5"
      }
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
      logo: "/placeholder.svg",
      stats: {
        users: "300+",
        efficiency: "92%",
        satisfaction: "4.7/5"
      }
    }
  ];

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
            {projects.map((project, index) => (
              <Card key={project.id} className="modern-card border-0 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <img src={project.logo} alt={project.name} className="w-8 h-8" />
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
                      onClick={() => window.open(project.projectUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
    </>
  );
};

export default ProjectsSection;
