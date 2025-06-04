
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Globe, Shield, Zap, Users, Code, Smartphone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AppleCard from '@/components/AppleCard';
import ServicesSection from '@/components/ServicesSection';
import ProductsSection from '@/components/ProductsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AuthSection from '@/components/AuthSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white space-y-6 md:space-y-8 text-center lg:text-right">
              <div className="space-y-4">
                <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 text-xs md:text-sm">
                  إدارة المشاريع والحلول التقنية
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  مرحباً بك في
                  <span className="block gradient-text">The Black Card</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                  نحن متخصصون في تقديم حلول إدارة المشاريع المتطورة وتطوير التطبيقات والأنظمة الذكية لتحويل رؤيتك إلى واقع رقمي مبتكر.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 transition-all">
                  استكشف خدماتنا
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  تواصل معنا
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-8 pt-6 md:pt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-500">50+</div>
                  <div className="text-xs md:text-sm text-gray-400">مشروع مكتمل</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-500">5+</div>
                  <div className="text-xs md:text-sm text-gray-400">سنوات خبرة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-500">100%</div>
                  <div className="text-xs md:text-sm text-gray-400">رضا العملاء</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center order-first lg:order-last">
              <AppleCard />
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-4 md:left-10 floating">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-4 md:right-10 floating" style={{animationDelay: '2s'}}>
          <div className="w-16 h-16 md:w-24 md:h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">لماذا تختارنا</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">مزايا فريدة تجعلنا الأفضل</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              نقدم حلولاً متكاملة ومبتكرة تلبي احتياجاتك التقنية بأعلى معايير الجودة والاحترافية
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6 md:h-8 md:w-8" />,
                title: "حلول سريعة",
                description: "تنفيذ المشاريع بكفاءة عالية ووقت قياسي"
              },
              {
                icon: <Shield className="h-6 w-6 md:h-8 md:w-8" />,
                title: "أمان متقدم",
                description: "حماية شاملة للبيانات والأنظمة"
              },
              {
                icon: <Users className="h-6 w-6 md:h-8 md:w-8" />,
                title: "فريق خبير",
                description: "مطورون ومستشارون ذوو خبرة واسعة"
              },
              {
                icon: <Globe className="h-6 w-6 md:h-8 md:w-8" />,
                title: "تغطية شاملة",
                description: "خدمات متنوعة تغطي جميع احتياجاتك"
              }
            ].map((feature, index) => (
              <Card key={index} className="modern-card text-center p-4 md:p-6 border-0 shadow-lg bg-gradient-to-br from-gray-800 to-gray-700">
                <CardContent className="pt-4 md:pt-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <ProductsSection />
      <ProjectsSection />
      
      {/* Add Authentication Section */}
      <AuthSection />
      
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
