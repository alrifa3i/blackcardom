
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ImageUpload from '../ImageUpload';

interface ProductFormProps {
  editingProduct: any;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  editingProduct, 
  onSubmit, 
  onCancel, 
  isLoading 
}) => {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price || 0,
    category: editingProduct?.category || 'systems',
    image_url: editingProduct?.image_url || '',
    features: Array.isArray(editingProduct?.features) 
      ? editingProduct.features.join(', ') 
      : '',
    is_featured: editingProduct?.is_featured || false,
    is_available: editingProduct?.is_available || true,
    demo_url: editingProduct?.demo_url || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
    };
    onSubmit(productData);
  };

  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white">
          {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">اسم المنتج</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-gray-600 border-gray-500 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-white">الفئة</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-md"
              >
                <option value="systems">أنظمة</option>
                <option value="ecommerce">تجارة إلكترونية</option>
                <option value="mobile">تطبيقات محمولة</option>
                <option value="web">تطبيقات ويب</option>
                <option value="desktop">تطبيقات سطح المكتب</option>
              </select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-white">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-gray-600 border-gray-500 text-white"
              rows={3}
              required
            />
          </div>

          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageChange={(url) => setFormData({...formData, image_url: url})}
            label="صورة المنتج"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-white">السعر ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                className="bg-gray-600 border-gray-500 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="demo_url" className="text-white">رابط العرض التوضيحي</Label>
              <Input
                id="demo_url"
                value={formData.demo_url}
                onChange={(e) => setFormData({...formData, demo_url: e.target.value})}
                className="bg-gray-600 border-gray-500 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="features" className="text-white">المميزات (مفصولة بفواصل)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              className="bg-gray-600 border-gray-500 text-white"
              placeholder="مميزة 1, مميزة 2, مميزة 3"
              rows={2}
            />
          </div>
          
          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})}
              />
              <Label htmlFor="is_featured" className="text-white">منتج مميز</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) => setFormData({...formData, is_available: checked})}
              />
              <Label htmlFor="is_available" className="text-white">متاح للبيع</Label>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="bg-yellow-500 text-black hover:bg-yellow-400"
              disabled={isLoading}
            >
              {isLoading ? 'جاري الحفظ...' : editingProduct ? 'تحديث' : 'إضافة'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
