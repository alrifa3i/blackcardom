
-- إنشاء جدول المنتجات
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'systems',
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  demo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إدراج بعض البيانات التجريبية
INSERT INTO public.products (name, description, price, category, image_url, features, is_featured, is_available, demo_url, display_order) VALUES
('نظام إدارة المخزون الذكي', 'نظام متطور لإدارة المخزون مع تتبع المنتجات والتنبيهات التلقائية', 400, 'systems', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80', '["تتبع المخزون", "تقارير مفصلة", "تنبيهات ذكية", "إدارة الموردين"]'::jsonb, true, true, 'https://inventory-demo.theblack-card.com', 1),
('نظام إدارة علاقات العملاء', 'نظام CRM شامل لإدارة العملاء والمبيعات والتسويق', 350, 'systems', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80', '["إدارة العملاء", "تتبع المبيعات", "حملات تسويقية", "تقارير شاملة"]'::jsonb, true, true, 'https://crm-demo.theblack-card.com', 2),
('نظام نقاط البيع الذكي', 'نظام POS متطور للمتاجر والمطاعم مع إدارة شاملة', 300, 'ecommerce', 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80', '["معالجة سريعة", "إدارة المخزون", "تقارير مبيعات", "دعم متعدد الفروع"]'::jsonb, true, true, 'https://pos-demo.theblack-card.com', 3);

-- إضافة فهرس لتحسين الأداء
CREATE INDEX idx_products_available ON public.products(is_available);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_products_display_order ON public.products(display_order);

-- إضافة trigger لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
