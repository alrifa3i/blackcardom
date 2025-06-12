
-- Create settings table for admin management
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Settings policies (only admins can manage)
CREATE POLICY "Admin can manage settings" ON public.settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- FAQ policies (everyone can read, only admins can modify)
CREATE POLICY "Everyone can read active FAQs" ON public.faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage FAQs" ON public.faqs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default social media settings
INSERT INTO public.settings (key, value, description) VALUES
  ('facebook_url', '#', 'Facebook page URL'),
  ('twitter_url', '#', 'Twitter profile URL'),
  ('instagram_url', '#', 'Instagram profile URL'),
  ('linkedin_url', '#', 'LinkedIn company page URL');

-- Insert some default FAQs
INSERT INTO public.faqs (question, answer, order_index) VALUES
  ('ما هي خدماتكم الأساسية؟', 'نحن نقدم خدمات إدارة الأنظمة، تطوير التطبيقات، والحلول السحابية لمساعدة الشركات على تحسين عملياتها التقنية.', 1),
  ('كم يستغرق تطوير المشروع؟', 'مدة تطوير المشروع تعتمد على تعقيد المتطلبات، لكن معظم مشاريعنا تكتمل خلال 2-6 أشهر.', 2),
  ('هل تقدمون الدعم الفني بعد التسليم؟', 'نعم، نقدم دعم فني شامل لمدة عام كامل مع جميع مشاريعنا، بالإضافة إلى خطط دعم ممتدة.', 3),
  ('ما هي تكلفة خدماتكم؟', 'تختلف التكلفة حسب نوع المشروع ومتطلباته. نقدم استشارة مجانية لتقييم احتياجاتكم وتقديم عرض سعر مفصل.', 4);

-- Add trigger for updated_at
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
