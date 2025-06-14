
-- إضافة عمود project_id للخدمات العادية دون حذف البيانات
ALTER TABLE services ADD COLUMN IF NOT EXISTS project_id text DEFAULT 'military-tech-project';

-- إضافة عمود project_id للخدمات الخاصة دون حذف البيانات  
ALTER TABLE special_services ADD COLUMN IF NOT EXISTS project_id text DEFAULT 'military-tech-project';

-- تحديث البيانات الموجودة لتنتمي لهذا المشروع
UPDATE services SET project_id = 'military-tech-project' WHERE project_id IS NULL;
UPDATE special_services SET project_id = 'military-tech-project' WHERE project_id IS NULL;

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_services_project_id ON services(project_id);
CREATE INDEX IF NOT EXISTS idx_special_services_project_id ON special_services(project_id);

-- تحديث سياسات RLS للخدمات العادية
DROP POLICY IF EXISTS "Allow public read access for active services" ON services;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON services;

CREATE POLICY "Allow public read access for military project services" ON services
    FOR SELECT USING (is_active = true AND project_id = 'military-tech-project');

CREATE POLICY "Allow all operations for authenticated users on military project" ON services
    FOR ALL USING (project_id = 'military-tech-project');

-- تحديث سياسات RLS للخدمات الخاصة
DROP POLICY IF EXISTS "Allow public read access for active special services" ON special_services;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON special_services;

CREATE POLICY "Allow public read access for military project special services" ON special_services
    FOR SELECT USING (is_active = true AND project_id = 'military-tech-project');

CREATE POLICY "Allow all operations for authenticated users on military project special services" ON special_services
    FOR ALL USING (project_id = 'military-tech-project');
