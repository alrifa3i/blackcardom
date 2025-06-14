
-- حذف جميع السياسات التي تعتمد على عمود role
DROP POLICY IF EXISTS "Admin can manage settings" ON public.settings;
DROP POLICY IF EXISTS "Admin can manage FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Everyone can read active FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can manage website projects" ON public.website_projects;
DROP POLICY IF EXISTS "Admin can manage web applications" ON public.web_applications;
DROP POLICY IF EXISTS "Admin can view WhatsApp contacts" ON public.whatsapp_contacts;
DROP POLICY IF EXISTS "Everyone can read visible website projects" ON public.website_projects;
DROP POLICY IF EXISTS "Everyone can read visible web applications" ON public.web_applications;
DROP POLICY IF EXISTS "Anyone can insert WhatsApp contacts" ON public.whatsapp_contacts;

-- حذف النوع إذا كان موجوداً ثم إنشاؤه من جديد
DROP TYPE IF EXISTS public.user_role CASCADE;
CREATE TYPE public.user_role AS ENUM ('admin', 'moderator', 'editor', 'viewer');

-- تحديث جدول profiles لإضافة المزيد من الحقول
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'));

-- إزالة القيمة الافتراضية أولاً ثم تحديث النوع
ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN role TYPE user_role USING role::user_role;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'viewer'::user_role;

-- إنشاء جدول إعدادات النظام المحسن
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    data_type TEXT DEFAULT 'string' CHECK (data_type IN ('string', 'number', 'boolean', 'json')),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(category, key)
);

-- إضافة بعض الإعدادات الافتراضية
INSERT INTO public.system_settings (category, key, value, description, data_type, is_public) 
VALUES 
    ('site', 'site_name', 'منصة الخدمات التقنية', 'اسم الموقع', 'string', true),
    ('site', 'site_description', 'منصة شاملة لتقديم الخدمات التقنية المتطورة', 'وصف الموقع', 'string', true),
    ('site', 'contact_email', 'info@techservices.com', 'البريد الإلكتروني للتواصل', 'string', true),
    ('site', 'contact_phone', '+964 770 123 4567', 'رقم الهاتف للتواصل', 'string', true),
    ('features', 'enable_registration', 'true', 'تفعيل التسجيل الجديد', 'boolean', false),
    ('features', 'enable_comments', 'true', 'تفعيل التعليقات', 'boolean', false),
    ('security', 'max_login_attempts', '5', 'عدد محاولات تسجيل الدخول المسموحة', 'number', false),
    ('security', 'session_timeout', '24', 'مدة انتهاء الجلسة بالساعات', 'number', false)
ON CONFLICT (category, key) DO NOTHING;

-- تفعيل RLS على system_settings
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- إنشاء جدول سجل النشاطات
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id TEXT,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- تفعيل RLS على activity_logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- دالة لتسجيل النشاطات
CREATE OR REPLACE FUNCTION public.log_activity(
    p_action TEXT,
    p_resource_type TEXT DEFAULT NULL,
    p_resource_id TEXT DEFAULT NULL,
    p_details JSONB DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.activity_logs (user_id, action, resource_type, resource_id, details)
    VALUES (auth.uid(), p_action, p_resource_type, p_resource_id, p_details);
END;
$$;

-- تحديث دالة handle_new_user لتعيين دور افتراضي
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    CASE 
      WHEN NEW.email = 'admin@techservices.com' THEN 'admin'::user_role
      ELSE 'viewer'::user_role
    END,
    'active'
  );
  
  -- تسجيل نشاط إنشاء المستخدم
  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (NEW.id, 'user_registered', jsonb_build_object('email', NEW.email));
  
  RETURN NEW;
END;
$$;

-- إنشاء trigger للتحديث التلقائي لـ updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إضافة trigger لجدول system_settings
DROP TRIGGER IF EXISTS update_system_settings_updated_at ON public.system_settings;
CREATE TRIGGER update_system_settings_updated_at
    BEFORE UPDATE ON public.system_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- إضافة trigger لجدول profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- إعادة إنشاء جميع السياسات مع النوع الجديد
CREATE POLICY "Allow reading public settings" ON public.system_settings
    FOR SELECT USING (is_public = true);

CREATE POLICY "Allow admins full access to settings" ON public.system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Allow admins to read all logs" ON public.activity_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Admin can manage settings" ON public.settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Admin can manage FAQs" ON public.faqs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Everyone can read active FAQs" ON public.faqs
    FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'::user_role
        )
    );

CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'::user_role
        )
    );

CREATE POLICY "Everyone can read visible website projects" ON public.website_projects
    FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can manage website projects" ON public.website_projects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Everyone can read visible web applications" ON public.web_applications
    FOR SELECT USING (is_visible = true);

CREATE POLICY "Admin can manage web applications" ON public.web_applications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Admin can view WhatsApp contacts" ON public.whatsapp_contacts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'::user_role
        )
    );

CREATE POLICY "Anyone can insert WhatsApp contacts" ON public.whatsapp_contacts
    FOR INSERT WITH CHECK (true);
