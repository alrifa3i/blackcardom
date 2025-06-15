
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Package, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from './ImageUpload';

const ProductsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'systems',
    image_url: '',
    features: '',
    is_featured: false,
    is_available: true,
    demo_url: ''
  });

  // جلب المنتجات من قاعدة البيانات
  const { data: products, isLoading } = useQuery({
    queryKey: ['products-management'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  // إضافة منتج جديد
  const addProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const { error } = await supabase
        .from('products')
        .insert([productData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-management'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "تم إضافة المنتج بنجاح" });
      resetForm();
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      toast({ 
        title: "خطأ في إضافة المنتج", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  // تحديث منتج
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...productData }: any) => {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-management'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "تم تحديث المنتج بنجاح" });
      resetForm();
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast({ 
        title: "خطأ في تحديث المنتج", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  // حذف منتج
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-management'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "تم حذف المنتج بنجاح" });
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast({ 
        title: "خطأ في حذف المنتج", 
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive" 
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'systems',
      image_url: '',
      features: '',
      is_featured: false,
      is_available: true,
      demo_url: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      features: Array.isArray(product.features) ? product.features.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, ...productData });
    } else {
      addProductMutation.mutate(productData);
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      'systems': 'أنظمة',
      'ecommerce': 'تجارة إلكترونية',
      'mobile': 'تطبيقات محمولة',
      'web': 'تطبيقات ويب',
      'desktop': 'تطبيقات سطح المكتب'
    };
    return categories[category as keyof typeof categories] || category;
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Package className="h-5 w-5" />
            إدارة المنتجات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-gray-400">جاري تحميل المنتجات...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Package className="h-5 w-5" />
            إدارة المنتجات
          </CardTitle>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة منتج جديد
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showForm && (
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
                    disabled={addProductMutation.isPending || updateProductMutation.isPending}
                  >
                    {addProductMutation.isPending || updateProductMutation.isPending ? 'جاري الحفظ...' : editingProduct ? 'تحديث' : 'إضافة'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <div className="grid gap-4">
          {products && products.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">لا توجد منتجات حالياً</div>
            </div>
          ) : (
            products?.map((product) => {
              const productFeatures = Array.isArray(product.features) ? product.features : [];
              
              return (
                <Card key={product.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {product.image_url && (
                        <div className="flex-shrink-0">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-semibold">{product.name}</h3>
                          {product.is_featured && (
                            <Badge className="bg-yellow-500 text-black text-xs">مميز</Badge>
                          )}
                          {!product.is_available && (
                            <Badge variant="secondary" className="text-xs">غير متاح</Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {getCategoryLabel(product.category)}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                        <div className="flex items-center gap-4 text-sm mb-2">
                          <span className="text-yellow-500 font-semibold text-lg">
                            ${product.price}
                          </span>
                        </div>
                        {productFeatures.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {productFeatures.slice(0, 3).map((feature: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {productFeatures.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{productFeatures.length - 3} أخرى
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {product.demo_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(product.demo_url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteProductMutation.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsManagement;
