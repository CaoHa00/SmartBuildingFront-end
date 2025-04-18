import { LucideIcon, Cpu, Lightbulb, Fan, Cctv, Droplet, Thermometer, Zap } from 'lucide-react';

export interface Category {
  categoryId: number;
  categoryName: string;
  equipments: any[];
}

// Map specific category IDs to icons
const categoryIconMap: Record<number, LucideIcon> = {
  1: Fan,        // Air conditioning/HVAC
  2: Cpu,  // Sensor
  3: Cctv,       // Security cameras
  4: Droplet,    // Humidity sensors
  5: Thermometer, // Temperature sensors
  10002: Lightbulb, // Lighting
  10004: Zap, // Switches
};

export const getCategoryIconById = (categoryId: number): LucideIcon => {
  return categoryIconMap[categoryId] || Cpu; // Return Cpu as default icon
};

// Keep existing name-based mapping for backward compatibility
export const getCategoryIcon = (categoryName: string): LucideIcon => {
  const name = categoryName.toLowerCase();
  if (name.includes('sensor')) return Fan;
  if (name.includes('lighting')|| name.includes('switch')) return Lightbulb;
  if (name.includes('camera') || name.includes('cctv')) return Cctv;
  if (name.includes('metter') || name.includes('water')) return Zap;
  if (name.includes('temperature')) return Thermometer;
  return Cpu; // default icon
};