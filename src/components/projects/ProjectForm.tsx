
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ProjectFormData } from '@/hooks/useProjectMutations';

interface ProjectFormProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  isEditing,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-white">اسم المشروع *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="bg-gray-800 border-gray-600 text-white"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="country" className="text-white">البلد *</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            className="bg-gray-800 border-gray-600 text-white"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-white">الوصف *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="bg-gray-800 border-gray-600 text-white"
          rows={3}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date" className="text-white">تاريخ المشروع *</Label>
          <Input
            id="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="bg-gray-800 border-gray-600 text-white"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="status" className="text-white">الحالة</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            disabled={isSubmitting}
          >
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="مكتمل">مكتمل</SelectItem>
              <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
              <SelectItem value="متوقف">متوقف</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="project_url" className="text-white">رابط المشروع</Label>
          <Input
            id="project_url"
            type="url"
            value={formData.project_url}
            onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
            className="bg-gray-800 border-gray-600 text-white"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="image_url" className="text-white">رابط الصورة</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            className="bg-gray-800 border-gray-600 text-white"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="technologies" className="text-white">التقنيات المستخدمة (مفصولة بفواصل)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
          className="bg-gray-800 border-gray-600 text-white"
          placeholder="React, Node.js, MongoDB"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border-gray-600 text-gray-300"
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button 
          type="submit"
          className="bg-yellow-500 text-black hover:bg-yellow-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
              جاري الحفظ...
            </>
          ) : (
            isEditing ? 'تحديث' : 'إضافة'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
