
-- تفعيل REPLICA IDENTITY لضمان إرسال البيانات الكاملة في التحديثات المباشرة
ALTER TABLE public.whatsapp_contacts REPLICA IDENTITY FULL;

-- إضافة جدول whatsapp_contacts إلى منشور supabase_realtime لتفعيل التحديثات المباشرة
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_contacts;
