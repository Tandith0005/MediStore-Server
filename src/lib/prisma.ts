import { PrismaClient } from "../generated/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { envVars } from "../config/envVars.js";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const adapter = new PrismaPg({ connectionString: envVars.DATABASE_URL });

  return new PrismaClient({
    adapter,
    log: envVars.NODE_ENV === 'development'
      ? ['query', 'error', 'warn', 'info']
      : ['error'],
    errorFormat: 'minimal',
  });
};

export const prisma = globalThis.prisma ?? createPrismaClient();

if (envVars.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;