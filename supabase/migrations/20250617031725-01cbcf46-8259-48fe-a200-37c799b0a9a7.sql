
-- إنشاء دالة آمنة للحصول على دور المستخدم بدون تداخل
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  -- استخدام SECURITY DEFINER لتجنب التداخل في RLS
  RETURN (SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- حذف جميع السياسات الموجودة على جدول profiles لتجنب التداخل
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- إنشاء سياسات جديدة باستخدام الدالة الآمنة
CREATE POLICY "Enable read access for own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Enable update for own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- تأكد من تفعيل RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
