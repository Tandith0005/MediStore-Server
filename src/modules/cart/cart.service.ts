// cart.service.ts - Production Ready
import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";

// Get cart with calculated totals
const getCart = async (userId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          stock: true,
          manufacturer: true,
        },
      },
    },
  });

  // Calculate cart summary
  const summary = cartItems.reduce(
    (acc, item) => {
      const itemTotal = item.medicine.price * item.quantity;
      acc.subtotal += itemTotal;
      acc.totalItems += item.quantity;
      return acc;
    },
    { subtotal: 0, totalItems: 0 }
  );

  return {
    items: cartItems,
    summary: {
      subtotal: summary.subtotal,
      totalItems: summary.totalItems,
      shippingFee: summary.subtotal > 500 ? 0 : 60,
      total: summary.subtotal > 500 ? summary.subtotal : summary.subtotal + 60,
    },
  };
};

// Add item to cart (with stock validation)
const upsertUserCart = async (medicineId: string, userId: string) => {
  // First, check if medicine exists and has stock
  const medicine = await prisma.medicines.findUnique({
    where: { id: medicineId },
    select: { id: true, name: true, stock: true, price: true },
  });

  if (!medicine) {
    throw new AppError(404, "Medicine not found");
  }

  if (medicine.stock <= 0) {
    throw new AppError(400, `Sorry, ${medicine.name} is out of stock`);
  }

  // Get current cart item
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      userId_medicineId: {
        medicineId,
        userId,
      },
    },
  });

  const newQuantity = (existingItem?.quantity || 0) + 1;

  // Check if requested quantity exceeds stock
  if (newQuantity > medicine.stock) {
    throw new AppError(
      400,
      `Cannot add more. Only ${medicine.stock} items available in stock`
    );
  }

  // Upsert cart item
  const cartItem = await prisma.cartItem.upsert({
    where: {
      userId_medicineId: {
        medicineId,
        userId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      medicineId,
      userId,
      quantity: 1,
    },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          stock: true,
        },
      },
    },
  });

  return cartItem;
};

// Decrease item quantity (or remove if quantity becomes 0)
const minusUserCart = async (medicineId: string, userId: string) => {
  // Check if item exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      userId_medicineId: {
        medicineId,
        userId,
      },
    },
    include: {
      medicine: {
        select: { name: true },
      },
    },
  });

  if (!existingItem) {
    throw new AppError(404, "Item not found in cart");
  }

  // If quantity is 1, remove the item completely
  if (existingItem.quantity <= 1) {
    await prisma.cartItem.delete({
      where: {
        userId_medicineId: {
          medicineId,
          userId,
        },
      },
    });
    
    return {
      message: "Item removed from cart",
      removed: true,
      medicineId,
    };
  }

  // Otherwise decrement quantity
  const updatedItem = await prisma.cartItem.update({
    where: {
      userId_medicineId: {
        medicineId,
        userId,
      },
    },
    data: {
      quantity: { decrement: 1 },
    },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return updatedItem;
};

// Delete specific item from cart
const deleteItemsInCart = async (cartItemId: string, userId: string) => {
  // Verify item belongs to user
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      userId,
    },
  });

  if (!cartItem) {
    throw new AppError(404, "Cart item not found");
  }

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  return { message: "Item removed from cart successfully" };
};

// Clear entire cart (useful after order placement)
const clearCart = async (userId: string) => {
  const result = await prisma.cartItem.deleteMany({
    where: { userId },
  });

  return {
    message: "Cart cleared successfully",
    deletedCount: result.count,
  };
};

// Update quantity directly (for quantity input changes)
const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number,
  userId: string
) => {
  if (quantity < 1) {
    throw new AppError(400, "Quantity must be at least 1");
  }

  // Get cart item with medicine stock
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      userId,
    },
    include: {
      medicine: {
        select: { stock: true, name: true },
      },
    },
  });

  if (!cartItem) {
    throw new AppError(404, "Cart item not found");
  }

  // Validate stock availability
  if (quantity > cartItem.medicine.stock) {
    throw new AppError(
      400,
      `Only ${cartItem.medicine.stock} items available for ${cartItem.medicine.name}`
    );
  }

  const updatedItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return updatedItem;
};

// Get cart item count (for badge/navigation)
const getCartItemCount = async (userId: string) => {
  const result = await prisma.cartItem.aggregate({
    where: { userId },
    _sum: { quantity: true },
  });

  return {
    count: result._sum.quantity || 0,
  };
};

// Validate cart items before order creation
const validateCartForCheckout = async (userId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          stock: true,
          price: true,
        },
      },
    },
  });

  if (cartItems.length === 0) {
    throw new AppError(400, "Cart is empty");
  }

  const unavailableItems = [];
  const stockIssues = [];

  for (const item of cartItems) {
    if (!item.medicine) {
      unavailableItems.push(item.medicineId);
    } else if (item.medicine.stock < item.quantity) {
      stockIssues.push({
        name: item.medicine.name,
        requested: item.quantity,
        available: item.medicine.stock,
      });
    }
  }

  if (unavailableItems.length > 0 || stockIssues.length > 0) {
    throw new AppError(400, "Cart validation failed");
  }

  return {
    valid: true,
    items: cartItems,
    total: cartItems.reduce(
      (sum, item) => sum + item.medicine.price * item.quantity,
      0
    ),
  };
};

export const cartService = {
  getCart,
  upsertUserCart,
  minusUserCart,
  deleteItemsInCart,
  clearCart,
  updateCartItemQuantity,
  getCartItemCount,
  validateCartForCheckout,
};