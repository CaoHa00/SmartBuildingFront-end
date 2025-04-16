import { LucideIcon, Cpu, Lightbulb, Fan, Cctv, Droplet, Thermometer } from 'lucide-react';

export interface Category {
  categoryId: number;
  categoryName: string;
  equipments: any[];
}

export const getCategoryIcon = (categoryName: string): LucideIcon => {
  const name = categoryName.toLowerCase();
  if (name.includes('air') || name.includes('ac')) return Fan;
  if (name.includes('light')) return Lightbulb;
  if (name.includes('camera') || name.includes('cctv')) return Cctv;
  if (name.includes('humidity') || name.includes('water')) return Droplet;
  if (name.includes('temperature')) return Thermometer;
  return Cpu; // default icon
};