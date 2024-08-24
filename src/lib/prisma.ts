import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(withAccelerate());
} else {
  // Если экземпляр Prisma еще не существует, создаем его
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
    globalThis.prisma = globalThis.prisma.$extends(withAccelerate());
  }
  prisma = globalThis.prisma;
}

export default prisma;
