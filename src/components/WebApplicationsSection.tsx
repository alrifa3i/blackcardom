
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const WebApplicationsSection = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['web-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('web_applications')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500 text-black">تطبيقات الويب</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">تطبيقات الويب</h2>
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
    <section id="web-applications" className="py-16 md:py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-yellow-500 text-black">تطبيقات الويب</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">تطبيقات الويب المتقدمة</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            نطور تطبيقات ويب قوية ومتطورة تساعد الشركات على تحسين عملياتها وزيادة كفاءتها
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {applications?.map((app) => (
            <Card key={app.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={app.image_url || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80'}
                  alt={app.title}
                  className="w-full h-48 object-cover"
                />
                {app.is_featured && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                    مميز
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-yellow-500 text-lg">{app.title}</CardTitle>
                {app.client_name && (
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    {app.client_name}
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{app.description}</p>
                
                {app.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(app.technologies) ? app.technologies : []).map((tech: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  {app.completion_date && (
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Calendar className="h-3 w-3" />
                      {new Date(app.completion_date).toLocaleDateString('ar-EG')}
                    </div>
                  )}
                  
                  {app.project_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                      onClick={() => window.open(app.project_url, '_blank')}
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
            عرض جميع التطبيقات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WebApplicationsSection;
