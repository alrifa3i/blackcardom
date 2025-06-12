
-- Create website projects table
CREATE TABLE public.website_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  client_name TEXT,
  project_url TEXT,
  completion_date DATE,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'planned')),
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create web applications table
CREATE TABLE public.web_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  client_name TEXT,
  project_url TEXT,
  completion_date DATE,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'planned')),
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create WhatsApp contact logs table
CREATE TABLE public.whatsapp_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_location TEXT,
  employee_name TEXT NOT NULL,
  contact_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_contacts ENABLE ROW LEVEL SECURITY;

-- Policies for website projects
CREATE POLICY "Everyone can read visible website projects" ON public.website_projects
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can manage website projects" ON public.website_projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for web applications
CREATE POLICY "Everyone can read visible web applications" ON public.web_applications
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can manage web applications" ON public.web_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for WhatsApp contacts
CREATE POLICY "Admin can view WhatsApp contacts" ON public.whatsapp_contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert WhatsApp contacts" ON public.whatsapp_contacts
  FOR INSERT WITH CHECK (true);

-- Add triggers for updated_at
CREATE TRIGGER update_website_projects_updated_at
  BEFORE UPDATE ON public.website_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_web_applications_updated_at
  BEFORE UPDATE ON public.web_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample website projects
INSERT INTO public.website_projects (title, description, image_url, technologies, client_name, project_url, completion_date, is_featured) VALUES
  ('موقع الشركة التجارية المتقدمة', 'موقع إلكتروني متطور للشركات التجارية مع نظام إدارة المحتوى', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80', '["React", "Next.js", "Tailwind CSS", "Strapi"]', 'مجموعة النجاح التجارية', 'https://business-site.om', '2024-01-15', true),
  ('منصة التعليم الرقمي', 'منصة تعليمية شاملة مع فصول افتراضية وإدارة الطلاب', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=500&q=80', '["Vue.js", "Laravel", "MySQL", "WebRTC"]', 'معهد الإبداع التعليمي', 'https://edu-platform.om', '2024-02-20', true),
  ('موقع العيادة الطبية', 'موقع طبي متخصص مع نظام حجز المواعيد ومتابعة المرضى', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=500&q=80', '["Angular", "Node.js", "PostgreSQL", "Socket.io"]', 'عيادة الحياة الصحية', 'https://health-clinic.om', '2024-03-10', true),
  ('موقع المطعم الفاخر', 'موقع مطعم أنيق مع قائمة الطعام التفاعلية ونظام الطلبات', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80', '["React", "Firebase", "Stripe", "PWA"]', 'مطعم الأصالة العماني', 'https://restaurant.om', '2023-12-05', false),
  ('متجر الإلكترونيات', 'متجر إلكتروني شامل للأجهزة الإلكترونية مع نظام الدفع المتقدم', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500&q=80', '["Shopify", "React", "GraphQL", "Stripe"]', 'تقنيات المستقبل', 'https://electronics-store.om', '2024-01-30', false),
  ('موقع الوكالة العقارية', 'منصة عقارية متطورة مع بحث تفاعلي وجولات افتراضية', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80', '["Next.js", "Prisma", "PostgreSQL", "Mapbox"]', 'عقارات الخليج', 'https://real-estate.om', '2023-11-20', false);

-- Insert sample web applications
INSERT INTO public.web_applications (title, description, image_url, technologies, client_name, project_url, completion_date, is_featured) VALUES
  ('نظام إدارة المخزون الذكي', 'تطبيق ويب متطور لإدارة المخزون مع تتبع الحركة والتحليلات', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80', '["React", "Node.js", "MongoDB", "Chart.js"]', 'شركة التوزيع العمانية', 'https://inventory-app.om', '2024-02-15', true),
  ('تطبيق إدارة المشاريع', 'منصة شاملة لإدارة المشاريع والفرق مع تتبع الوقت والمهام', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80', '["Vue.js", "Express", "PostgreSQL", "Redis"]', 'مكتب الاستشارات الهندسية', 'https://project-manager.om', '2024-03-01', true),
  ('نظام إدارة الموارد البشرية', 'تطبيق متكامل لإدارة الموظفين والرواتب والإجازات', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', '["Angular", "Spring Boot", "MySQL", "JWT"]', 'الشركة الوطنية للنفط', 'https://hr-system.om', '2024-01-20', true),
  ('منصة إدارة العملاء', 'نظام CRM متقدم لإدارة العلاقات مع العملاء والمبيعات', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=500&q=80', '["React", "Django", "PostgreSQL", "Celery"]', 'شركة الخدمات المالية', 'https://crm-platform.om', '2023-12-10', false),
  ('تطبيق إدارة المستشفى', 'نظام شامل لإدارة المستشفيات مع السجلات الطبية والمواعيد', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80', '["Next.js", "Prisma", "PostgreSQL", "HL7"]', 'مستشفى السلطان قابوس', 'https://hospital-system.om', '2024-02-28', false),
  ('نظام إدارة المدارس', 'تطبيق متكامل لإدارة المدارس والطلاب والدرجات والحضور', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80', '["Vue.js", "Laravel", "MySQL", "WebSocket"]', 'وزارة التربية والتعليم', 'https://school-management.om', '2023-10-15', false);
