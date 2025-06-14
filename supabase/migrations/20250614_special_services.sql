
-- Create special_services table
CREATE TABLE IF NOT EXISTS special_services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    detailed_description text,
    base_service_id uuid REFERENCES services(id),
    project_types jsonb DEFAULT '[]'::jsonb,
    features jsonb DEFAULT '[]'::jsonb,
    icon text,
    color text DEFAULT '#3B82F6',
    is_featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_special_services_is_active ON special_services(is_active);
CREATE INDEX IF NOT EXISTS idx_special_services_display_order ON special_services(display_order);
CREATE INDEX IF NOT EXISTS idx_special_services_is_featured ON special_services(is_featured);
CREATE INDEX IF NOT EXISTS idx_special_services_base_service_id ON special_services(base_service_id);

-- Add RLS policies
ALTER TABLE special_services ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active services
CREATE POLICY "Allow public read access for active special services" ON special_services
    FOR SELECT USING (is_active = true);

-- Allow all operations for authenticated users (admin)
CREATE POLICY "Allow all operations for authenticated users" ON special_services
    FOR ALL USING (auth.role() = 'authenticated');
