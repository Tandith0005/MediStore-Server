import { prisma } from "../../lib/prisma";


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
  updateUser,
  deleteUser,
};
