import { Equipment } from "./equipment";

export interface Space {
  spaceId: string;
  spaceName: string;
  parentId: string;
  spaceTypeId: string;
  spaceTypeName: string;
  children: Space[];
  equipments: Equipment[];
}

export interface SpaceType {
  spaceTypeId: string;
  spaceTypeName: string;
  parentTypeId: string | null;
}

export interface NewSpaceData {
  spaceName: string;
  spaceTypeId: string;
  spaceTypeName: string;
  parentId: string;
  children: Space[];
  equipment: Equipment[];
}
