export interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
  equipmentTypeId: string;
  categoryId: number;
  spaceId: string;
  logValue: number | null;
}

export interface NewEquipmentData {
  equipmentName: string;
  deviceId: string;
}

export interface EquipmentType {
  equipmentTypeId: string;
  equipmentTypeName: string;
  equipments: any[];
}
