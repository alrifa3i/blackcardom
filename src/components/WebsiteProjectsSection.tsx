
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProjectViewer from './ProjectViewer';

const WebsiteProjectsSection = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{url: string, title: string} | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['website-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('website_projects')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true })
        .limit(3);
      
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

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500 text-black">تصميم المواقع</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">مشاريع تصميم المواقع</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section id="website-projects" className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">تصميم المواقع</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">مشاريع تصميم المواقع</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              نصمم مواقع إلكترونية عصرية ومتجاوبة تلبي احتياجات عملائنا وتحقق أهدافهم التجارية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects?.map((project) => (
              <Card key={project.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80'}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.is_featured && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                      مميز
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-yellow-500 text-lg">{project.title}</CardTitle>
                  {project.client_name && (
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {project.client_name}
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{project.description}</p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.technologies) ? project.technologies : []).map((tech: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    {project.completion_date && (
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.completion_date).toLocaleDateString('ar-EG')}
                      </div>
                    )}
                    
                    {project.project_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                        onClick={() => handleViewProject(project.project_url!, project.title)}
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
          
          <div className="text-center mt-12">
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
              عرض جميع مشاريع المواقع
            </Button>
          </div>
        </div>
      </section>
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

export default WebsiteProjectsSection;
