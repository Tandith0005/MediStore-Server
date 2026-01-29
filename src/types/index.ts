export interface CreateMedicinePayload {
  id?: string;
  name: string;
  description?: string;
  manufacturer: string;
  price: number;
  image?: string;
  category: string;
  sellerId: string;
}