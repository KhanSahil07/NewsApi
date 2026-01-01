import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  log: ["query", "error"],
  // Add the missing required field
  __internal: {
    engine: {
      enableTracing: false // required by Prisma 5+
    }
  }
});


export default prisma;
