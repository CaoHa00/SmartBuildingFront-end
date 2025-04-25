"use client";

import { useState } from "react";
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
import { useCategories } from "@/hooks/use-categories";
import { DeleteConfirmModal } from "@/components/delete-confirmation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const CategoryManagement = () => {
  const { categories, loading, isDeleting, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategories();
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    const success = await createCategory(newCategory);
    if (success) {
      setNewCategory("");
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;
    const success = await updateCategory(id, editName);
    if (success) {
      setEditingId(null);
      setEditName("");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    const success = await deleteCategory(deleteTargetId);
    if (success) {
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
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
                <TableHead className="w-[60%]">ID</TableHead>
                <TableHead className="w-[25%]">Name</TableHead>
                <TableHead className="w-[15%] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : categories.map((category) => (
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
                  <TableCell className="text-center">
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
                      onClick={() => setDeleteTargetId(category.categoryId)}
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
      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Delete Category"
        description="Are you sure you want to delete this Category? This action cannot be undone."
        confirmText="Delete"
      />
    </>
  );
};

export default CategoryManagement;
