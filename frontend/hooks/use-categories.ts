import { useState } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";

export const useCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get<Category[]>("/category");
      setCategories(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch categories",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryName: string) => {
    try {
      await api.post("/category", { categoryName });
      await fetchCategories();
      toast({
        title: "Success",
        description: "Category added successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add category",
      });
      return false;
    }
  };

  const updateCategory = async (categoryId: number, categoryName: string) => {
    try {
      await api.put(`/category/${categoryId}`, { categoryName });
      await fetchCategories();
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update category",
      });
      return false;
    }
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      setIsDeleting(true);
      await api.delete(`/category/${categoryId}`);
      await fetchCategories();
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete category",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    categories,
    loading,
    isDeleting,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};