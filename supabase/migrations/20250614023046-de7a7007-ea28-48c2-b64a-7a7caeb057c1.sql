
-- إنشاء bucket للصور
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true);

-- إنشاء سياسات للسماح بالوصول العام للقراءة
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');

-- إنشاء سياسة للسماح برفع الملفات للمستخدمين المصرحين
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- إنشاء سياسة للسماح بحذف الملفات للمستخدمين المصرحين
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE 
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');
