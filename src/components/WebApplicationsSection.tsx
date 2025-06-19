
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from '@/utils/queryKeys';
import ServiceRequestForm from './ServiceRequestForm';
import ProjectViewer from './ProjectViewer';

const WebApplicationsSection = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{url: string, title: string} | null>(null);

  // استخدام المفاتيح الموحدة والإعدادات المحسنة
  const { data: applications, isLoading } = useQuery({
    queryKey: QUERY_KEYS.WEB_APPLICATIONS,
    queryFn: async () => {
      console.log('Fetching web applications for display...');
      const { data, error } = await supabase
        .from('web_applications')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching web applications:', error);
        throw error;
      }
      console.log('Web applications fetched for display:', data);
      return data;
    },
    ...DEFAULT_QUERY_OPTIONS
  });

  const handleViewProject = (url: string, title: string) => {
    if (url && title) {
      setSelectedProject({ url, title });
      setIsViewerOpen(true);
    }
  };

  const displayedApps = showMore ? applications : applications?.slice(0, 6);

  if (isLoading) {
    return (
      <section id="web-applications" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">تطبيقات الويب</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">تطبيقات ويب متطورة</h2>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="web-applications" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">تطبيقات الويب</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">تطبيقات ويب متطورة</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نطور تطبيقات ويب حديثة وتفاعلية تلبي احتياجات عملك وتحقق أهدافك التجارية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayedApps?.map((app) => (
              <Card key={app.id} className="modern-card border-0 shadow-xl bg-gradient-to-br from-gray-700 to-gray-600 hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {app.is_featured && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                      <Badge className="bg-blue-500 text-white">
                        تطبيق ويب
                      </Badge>
                    </div>
                  </div>
                  
                  {app.image_url && (
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={app.image_url} 
                        alt={app.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                    {app.title}
                  </CardTitle>
                  
                  {app.completion_date && (
                    <div className="flex items-center text-gray-300 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(app.completion_date).toLocaleDateString('ar-SA')}</span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {app.description}
                  </p>

                  {app.client_name && (
                    <div className="text-sm text-gray-400">
                      <span className="font-semibold">العميل:</span> {app.client_name}
                    </div>
                  )}

                  {/* التقنيات المستخدمة */}
                  {app.technologies && Array.isArray(app.technologies) && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">التقنيات المستخدمة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.technologies.map((tech: string, techIndex: number) => (
                          <Badge key={techIndex} variant="outline" className="text-xs border-blue-500 text-blue-400">
                            {tech}
                          </Badge>
                        ))}
                      </div>
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
                    {app.project_url && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 text-white hover:bg-gray-700"
                        onClick={() => handleViewProject(app.project_url, app.title)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        عرض
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {applications && applications.length > 6 && (
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
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-400/10 border border-blue-500/20 rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                تحتاج تطبيق ويب مخصص؟
              </h3>
              <p className="text-gray-300 mb-6">
                نحن نطور تطبيقات ويب متطورة وسريعة الاستجابة تناسب احتياجات عملك
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

export default WebApplicationsSection;
