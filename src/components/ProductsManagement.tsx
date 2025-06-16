
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductForm from './products/ProductForm';
import ProductList from './products/ProductList';

const ProductsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const queryClient = useQueryClient();

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
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleSubmit = (formData: any) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, ...formData });
    } else {
      addProductMutation.mutate(formData);
    }
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
          <ProductForm
            editingProduct={editingProduct}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isLoading={addProductMutation.isPending || updateProductMutation.isPending}
          />
        )}
        
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={deleteProductMutation.isPending}
        />
      </CardContent>
    </Card>
  );
};

export default ProductsManagement;
