
import { prisma } from "../../lib/prisma.js";



const getAllUsers = async () => {
  return prisma.user.findMany();
}

const banUser = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
  });
};
const unbanUser = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isDeleted: false },
  });
};

const updateUser = async (
  userId: string,
  payload: {
    name?: string;
    phone?: string;
    address?: string;
  }
) => {
  const allowedData = {
    ...(payload.name && { name: payload.name }),
    ...(payload.phone && { phone: payload.phone }),
    ...(payload.address && { address: payload.address }),
  };

  return prisma.user.update({
    where: { id: userId },
    data: allowedData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

export const userService = {
  getAllUsers,
  banUser,
  unbanUser,
  updateUser,
  deleteUser,
};
