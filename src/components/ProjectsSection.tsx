
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Calendar, ExternalLink, Users, Zap, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ServiceRequestForm from './ServiceRequestForm';
import ProjectViewer from './ProjectViewer';

const ProjectsSection = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{url: string, title: string} | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const handleViewProject = (url: string, title: string) => {
    if (url && title) {
      setSelectedProject({ url, title });
      setIsViewerOpen(true);
    }
  };

  const displayedProjects = showMore ? projects : projects?.slice(0, 3);

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">مشاريعنا</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">مشاريع نفخر بإنجازها</h2>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            {displayedProjects?.map((project) => {
              // Safely access stats object properties with proper type checking
              const projectStats = project.stats && typeof project.stats === 'object' && !Array.isArray(project.stats) 
                ? project.stats as Record<string, any>
                : {};

              return (
                <Card key={project.id} className="modern-card border-0 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
                        <img src={project.logo || project.image_url} alt={project.name} className="w-full h-full object-cover" />
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
                    {Object.keys(projectStats).length > 0 && (
                      <div className="grid grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg">
                        <div className="text-center">
                          <Users className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                          <div className="text-sm font-bold text-white">{projectStats.users || 'N/A'}</div>
                          <div className="text-xs text-gray-400">مستخدم</div>
                        </div>
                        <div className="text-center">
                          <Zap className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                          <div className="text-sm font-bold text-white">{projectStats.efficiency || 'N/A'}</div>
                          <div className="text-xs text-gray-400">كفاءة</div>
                        </div>
                        <div className="text-center">
                          <Shield className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                          <div className="text-sm font-bold text-white">{projectStats.satisfaction || 'N/A'}</div>
                          <div className="text-xs text-gray-400">تقييم</div>
                        </div>
                      </div>
                    )}

                    {/* التقنيات المستخدمة */}
                    {project.technologies && Array.isArray(project.technologies) && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">التقنيات المستخدمة:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string, techIndex: number) => (
                            <Badge key={techIndex} variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* الإنجازات */}
                    {project.achievements && Array.isArray(project.achievements) && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">الإنجازات الرئيسية:</h4>
                        <ul className="space-y-1">
                          {project.achievements.map((achievement: string, achIndex: number) => (
                            <li key={achIndex} className="text-xs text-gray-300 flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

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
                      {project.project_url && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600 text-white hover:bg-gray-700"
                          onClick={() => handleViewProject(project.project_url, project.name)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          عرض
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {projects && projects.length > 3 && (
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
