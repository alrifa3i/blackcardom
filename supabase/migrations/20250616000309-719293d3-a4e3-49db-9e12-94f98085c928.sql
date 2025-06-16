
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  logo TEXT,
  country TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'مكتمل' CHECK (status IN ('مكتمل', 'قيد التطوير')),
  technologies JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  project_url TEXT,
  stats JSONB DEFAULT '{}'::jsonb,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Everyone can read visible projects" ON public.projects
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can manage projects" ON public.projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data from ProjectsSection
INSERT INTO public.projects (name, description, image_url, logo, country, date, status, technologies, achievements, project_url, stats, is_visible, display_order) VALUES
  ('نظام إدارة سلسلة التوريد', 'نظام متطور لإدارة سلسلة التوريد يشمل تتبع المخزون والتوزيع والتحليلات الذكية', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80', 'الرياض، المملكة العربية السعودية', '2024', 'مكتمل', '["AI/ML", "MongoDB", "Python", "Angular"]', '["تقليل التكاليف بنسبة 25%", "تحسين سرعة التسليم بنسبة 30%", "تقليل نسبة الفقد بنسبة 90%"]', 'https://supply-management.sa', '{"users": "500+", "efficiency": "95%", "satisfaction": "4.9/5"}', true, 1),
  ('منصة التجارة الإلكترونية المتكاملة', 'منصة تجارة إلكترونية شاملة مع نظام دفع متطور وإدارة المخزون والتحليلات', 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80', 'الكويت، دولة الكويت', '2023', 'مكتمل', '["React", "Node.js", "PostgreSQL", "Stripe"]', '["زيادة المبيعات بنسبة 150%", "تحسين تجربة المستخدم بنسبة 40%", "معدل تحويل عالي 8.5%"]', 'https://ecommerce-kuwait.com', '{"users": "2,000+", "efficiency": "98%", "satisfaction": "4.8/5"}', true, 2),
  ('تطبيق إدارة المطاعم الذكي', 'تطبيق شامل لإدارة المطاعم يشمل الطلبات والمخزون والموظفين والتقارير المالية', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=200&q=80', 'دبي، دولة الإمارات العربية المتحدة', '2023', 'قيد التطوير', '["Flutter", "Firebase", "Node.js", "Express"]', '["تقليل وقت الخدمة بنسبة 35%", "تحسين إدارة المخزون بنسبة 50%", "زيادة رضا العملاء بنسبة 45%"]', 'https://restaurant-app.ae', '{"users": "300+", "efficiency": "92%", "satisfaction": "4.7/5"}', true, 3),
  ('منصة التعليم الإلكتروني', 'منصة تعليمية متطورة مع فصول افتراضية وتتبع التقدم وأدوات تفاعلية', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=200&q=80', 'مسقط، سلطنة عُمان', '2024', 'مكتمل', '["React", "WebRTC", "MongoDB", "AWS"]', '["تحسين نتائج الطلاب بنسبة 60%", "زيادة التفاعل بنسبة 80%", "توفير 40% من التكاليف التشغيلية"]', 'https://elearning-oman.com', '{"users": "1,500+", "efficiency": "96%", "satisfaction": "4.8/5"}', true, 4),
  ('نظام إدارة المستشفى الذكي', 'نظام شامل لإدارة المستشفيات مع السجلات الطبية الإلكترونية وجدولة المواعيد', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80', 'الدوحة، دولة قطر', '2024', 'مكتمل', '["Angular", "Spring Boot", "MySQL", "HL7"]', '["تقليل أوقات الانتظار بنسبة 50%", "تحسين دقة التشخيص بنسبة 30%", "زيادة كفاءة الموظفين بنسبة 45%"]', 'https://hospital-qatar.com', '{"users": "800+", "efficiency": "94%", "satisfaction": "4.9/5"}', true, 5),
  ('تطبيق الخدمات الحكومية', 'تطبيق موحد للخدمات الحكومية مع معالجة ذكية للطلبات ودفع إلكتروني', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80', 'المنامة، مملكة البحرين', '2023', 'مكتمل', '["Vue.js", "Django", "PostgreSQL", "Blockchain"]', '["تقليل وقت المعالجة بنسبة 70%", "زيادة رضا المواطنين بنسبة 85%", "توفير 60% من التكاليف الإدارية"]', 'https://gov-services-bh.com', '{"users": "50,000+", "efficiency": "97%", "satisfaction": "4.7/5"}', true, 6),
  ('منصة التمويل الرقمي', 'منصة مالية رقمية متطورة للخدمات المصرفية والاستثمار مع الذكاء الاصطناعي', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&q=80', 'أبوظبي، دولة الإمارات العربية المتحدة', '2024', 'قيد التطوير', '["React Native", "Microservices", "Docker", "AI/ML"]', '["معالجة أسرع للمعاملات بنسبة 80%", "تحسين الأمان بنسبة 95%", "زيادة قاعدة المستخدمين بنسبة 200%"]', 'https://fintech-uae.com', '{"users": "5,000+", "efficiency": "93%", "satisfaction": "4.6/5"}', true, 7),
  ('نظام إدارة النقل الذكي', 'نظام متطور لإدارة النقل العام مع تتبع المركبات وتحسين المسارات', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80', 'الرياض، المملكة العربية السعودية', '2023', 'مكتمل', '["IoT", "React", "Python", "GPS Tracking"]', '["تحسين كفاءة النقل بنسبة 40%", "تقليل الازدحام بنسبة 30%", "زيادة رضا الركاب بنسبة 55%"]', 'https://transport-sa.com', '{"users": "10,000+", "efficiency": "91%", "satisfaction": "4.5/5"}', true, 8),
  ('منصة إدارة الطاقة الذكية', 'نظام ذكي لمراقبة وإدارة استهلاك الطاقة في المباني والمنشآت', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80', 'مسقط، سلطنة عُمان', '2024', 'قيد التطوير', '["IoT", "Machine Learning", "React", "InfluxDB"]', '["توفير 35% من استهلاك الطاقة", "تحسين الكفاءة بنسبة 50%", "تقليل الانبعاثات بنسبة 25%"]', 'https://smart-energy-oman.com', '{"users": "200+", "efficiency": "89%", "satisfaction": "4.8/5"}', true, 9);
