'use client';

import { useState, useEffect } from 'react';
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Category {
  categoryId: number;
  categoryName: string;
  equipments: any[];
}

const CategoryManagement = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>('/category');
      setCategories(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch categories",
      });
    }
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Category name cannot be empty",
      });
      return;
    }
    try {
      await api.post('/category', {
        categoryName: newCategory
      });
      setNewCategory('');
      fetchCategories();
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add category",
      });
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Category name cannot be empty",
      });
      return;
    }
    try {
      await api.put(`/category/${id}`, {
        categoryName: editName
      });
      setEditingId(null);
      setEditName('');
      fetchCategories();
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update category",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/category/${id}`);
      fetchCategories();
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete category",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
            Category Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border border-border text-neutral-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.categoryId}>
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>
                  {editingId === category.categoryId ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    category.categoryName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === category.categoryId ? (
                    <Button
                      className="mr-2 bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                      onClick={() => handleUpdate(category.categoryId)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                      onClick={() => {
                        setEditingId(category.categoryId);
                        setEditName(category.categoryName);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(category.categoryId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryManagement;