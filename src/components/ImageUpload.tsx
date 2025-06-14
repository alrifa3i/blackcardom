
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (url: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImageUrl,
  onImageChange,
  label = "رفع صورة",
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: "خطأ", description: "يرجى اختيار ملف صورة صالح" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "خطأ", description: "حجم الملف يجب أن يكون أقل من 5 ميجابايت" });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading file:', filePath);

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      console.log('File uploaded successfully:', publicUrl);

      setPreviewUrl(publicUrl);
      onImageChange(publicUrl);
      
      toast({ title: "تم رفع الصورة بنجاح" });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({ 
        title: "خطأ في رفع الصورة", 
        description: "حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى." 
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    onImageChange('');
    toast({ title: "تم حذف الصورة" });
  };

  const handleUrlChange = (url: string) => {
    setPreviewUrl(url);
    onImageChange(url);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-white">{label}</Label>
      
      {/* Preview */}
      {previewUrl && (
        <div className="relative inline-block">
          <img 
            src={previewUrl} 
            alt="معاينة الصورة" 
            className="w-32 h-32 object-cover rounded-lg border border-gray-600"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Upload section */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="image-upload" className="text-white text-sm">رفع صورة جديدة</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="bg-gray-600 border-gray-500 text-white file:bg-yellow-500 file:text-black file:border-0 file:rounded file:px-2 file:py-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {uploading ? (
                <>جاري الرفع...</>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-1" />
                  رفع
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="text-gray-400 text-xs">
          أو
        </div>

        <div>
          <Label htmlFor="image-url" className="text-white text-sm">رابط صورة خارجي</Label>
          <Input
            id="image-url"
            type="url"
            value={previewUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="bg-gray-600 border-gray-500 text-white mt-1"
          />
        </div>
      </div>

      <div className="text-xs text-gray-400">
        أنواع الملفات المدعومة: JPG, PNG, GIF, WebP (حد أقصى 5 ميجابايت)
      </div>
    </div>
  );
};

export default ImageUpload;
