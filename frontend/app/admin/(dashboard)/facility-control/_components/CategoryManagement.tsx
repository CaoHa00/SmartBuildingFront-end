'use client';

import * as React from 'react';
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
import { ExpandableRow } from "@/components/dialog/ExpandableRow";
import { getCategoryIconById } from "@/types/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  categoryId: number;
  categoryName: string;
  equipments: Array<{
    equipmentId: number;
    equipmentName: string;
    deviceId: string;
  }>;
}

const CategoryManagement = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
  const [changingEquipmentId, setChangingEquipmentId] = useState<number | null>(null);

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

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
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

  const handleChangeEquipmentCategory = async (equipmentId: number, newCategoryId: number) => {
    try {
      await api.put(`/equipment/${equipmentId}`, {
        categoryId: newCategoryId
      });
      fetchCategories();
      setChangingEquipmentId(null);
      toast({
        title: "Success",
        description: "Equipment category updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment category",
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
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <React.Fragment key={category.categoryId}>
                <TableRow>
                  <TableCell>
                    <ExpandableRow
                      isOpen={expandedCategories[category.categoryId] || false}
                      onClick={() => toggleCategory(category.categoryId)}
                      icon={getCategoryIconById(category.categoryId)}
                      name={category.categoryName}
                      count={category.equipments.length}
                      id={category.categoryId}
                    />
                  </TableCell>
                  <TableCell>
                    {editingId === category.categoryId ? (
                      <>
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-48 mr-2"
                        />
                        <Button
                          className="mr-2 bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                          onClick={() => handleUpdate(category.categoryId)}
                        >
                          Save
                        </Button>
                      </>
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
                {expandedCategories[category.categoryId] && category.equipments.map(equipment => (
                  <TableRow key={equipment.equipmentId} className="bg-muted/20">
                    <TableCell>
                      <div
                        className="flex items-center gap-2"
                        style={{ paddingLeft: "40px" }}
                      >
                        {React.createElement(getCategoryIconById(category.categoryId), { size: 16 })}
                        <span>{equipment.equipmentName}</span>
                        <span className="text-sm text-muted-foreground">
                          (ID: {equipment.equipmentId}, Device ID: {equipment.deviceId})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {changingEquipmentId === equipment.equipmentId ? (
                        <div className="flex items-center gap-2">
                          <Select
                            value={category.categoryId.toString()}
                            onValueChange={(value) => {
                              handleChangeEquipmentCategory(equipment.equipmentId, parseInt(value, 10));
                            }}
                          >
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.categoryId} value={cat.categoryId.toString()}>
                                  {cat.categoryName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            onClick={() => setChangingEquipmentId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                          onClick={() => setChangingEquipmentId(equipment.equipmentId)}
                        >
                          Change Category
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryManagement;