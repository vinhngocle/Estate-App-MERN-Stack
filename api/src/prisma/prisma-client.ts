import { PrismaClient } from '@prisma/client';

declare const global: {
  prisma?: PrismaClient; // Make prisma optional
};

// Prevent multiple instances of Prisma Client in development
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development' && !global.prisma) {
  global.prisma = prisma;
}

export default prisma;
