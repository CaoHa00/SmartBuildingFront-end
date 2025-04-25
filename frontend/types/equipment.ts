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
  spaceId: string;
  equipmentName: string;
  equipmentTypeId: string;
  categoryId: number;
  deviceId: string;
}

export interface EquipmentType {
  equipmentTypeId: string;
  equipmentTypeName: string;
  equipments: any[];
}

export interface EquipmentValue {
  valueResponse: number;
  valueName: string;
  equipmentName: string;
  equipmentId: string;
}
