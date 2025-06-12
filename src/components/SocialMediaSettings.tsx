
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Facebook, Twitter, Instagram, Linkedin, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SocialMediaSettings = () => {
  const [settings, setSettings] = useState({
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['facebook_url', 'twitter_url', 'instagram_url', 'linkedin_url']);
      
      if (error) throw error;
      
      const settingsObj: any = {};
      data?.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });
      
      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "خطأ في تحميل الإعدادات",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString()
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('settings')
          .upsert(update, { onConflict: 'key' });
        
        if (error) throw error;
      }

      toast({
        title: "تم حفظ الإعدادات بنجاح",
        description: "تم تحديث روابط التواصل الاجتماعي",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "خطأ في حفظ الإعدادات",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-yellow-500">إعدادات وسائل التواصل الاجتماعي</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-white flex items-center gap-2 mb-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                رابط Facebook
              </Label>
              <Input
                type="url"
                placeholder="https://facebook.com/yourpage"
                value={settings.facebook_url}
                onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white flex items-center gap-2 mb-2">
                <Twitter className="h-4 w-4 text-blue-400" />
                رابط Twitter/X
              </Label>
              <Input
                type="url"
                placeholder="https://twitter.com/yourprofile"
                value={settings.twitter_url}
                onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white flex items-center gap-2 mb-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                رابط Instagram
              </Label>
              <Input
                type="url"
                placeholder="https://instagram.com/yourprofile"
                value={settings.instagram_url}
                onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white flex items-center gap-2 mb-2">
                <Linkedin className="h-4 w-4 text-blue-700" />
                رابط LinkedIn
              </Label>
              <Input
                type="url"
                placeholder="https://linkedin.com/company/yourcompany"
                value={settings.linkedin_url}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSettings;
