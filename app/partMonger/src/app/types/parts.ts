export interface Part {
  id: number;
  cost: number;
  partNumber: string;
  description: string;
  name: string;
  notes: string;
  inStock?: number;
  image: string;
  isActive: boolean;
}
