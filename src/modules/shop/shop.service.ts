import React from 'react';
import { prisma } from '../../lib/prisma';

const getAllShopItems = () => {
    return prisma.medicines.findMany();
};

export const shopService = {
    getAllShopItems
};