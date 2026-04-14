import { OrderStatus } from "../generated/client/index.js";

export interface CreateMedicinePayload {
  id?: string;
  name: string;
  description?: string;
  manufacturer: string;
  price: number;
  image?: string;
  categoryId: string;
  sellerId: string;
}

export interface UpdateMedicinePayload {
  id: string;
  name?: string;
  description?: string;
  manufacturer?: string;
  price?: number;
  image?: string;
  categoryId?: string;
  stock?: number;
}

export interface FilterQuery {
  search?: string;
  category?: string;
  manufacturer?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  limit?: string;
  sortBy?: "price" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
}

// Review ------------------------------------------------------------------------
export interface CreateReviewPayload {
  medicineId: string;
  rating: number;  // 1-5
  comment?: string;
}

export interface UpdateReviewPayload {
  id: string;
  rating?: number;
  comment?: string;
}

// types/index.ts - Add these types
export interface CreateOrderPayload {
  userId: string;
  shippingAddress?: string;
  paymentMethod?: string;
}

// Order ------------------------------------------------------------------------
export interface UpdateOrderStatusPayload {
  orderId: string;
  status: OrderStatus;
  note?: string;
}
export interface OrderQueryParams {
  page?: string;
  limit?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}