export interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
  categoryId: number;
  equipmentTypeId?: number;
}

export interface Room {
  roomId: number;
  roomName: string;
  equipments: Equipment[];
}

export interface Floor {
  floorId: number;
  floorName: string;
  rooms: Room[];
  totalRooms?: number;
  activeRooms?: number;
  occupancy?: number;
}

export interface Block {
  blockId: number;
  blockName: string;
  floors: Floor[];
  status: 'Active' | 'Inactive';
  totalFloors?: number;
}

export interface NewBlockData {
  blockName: string;
}

export interface NewFloorData {
  blockId: number;
  floorName: string;
}

export interface NewRoomData {
  floorId: number;
  roomName: string;
}

export interface NewEquipmentData {
  roomId: number;
  equipmentName: string;
  deviceId: string;
  categoryId: number;
}