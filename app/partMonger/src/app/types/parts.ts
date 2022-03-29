export interface Part {
  id: number;
  cost: number;
  partNumber: string;
  description: string;
  name: string;
  notes: string;
  inStock: number;
  image: string;
  isActive: boolean;
}
export interface CreatePart {
  partNumber: string;
  name: string;
  description: string;
  cost: number;
  image: string;
  notes: string;
  isActive: boolean;
  inStock:number;
}

export interface EditPart {
  id: number;
}
