export interface CreateMedicinePayload {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  sellerId: string;
}