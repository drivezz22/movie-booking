require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function run() {
  await prisma.$executeRawUnsafe("DROP Database movie_booking");
  await prisma.$executeRawUnsafe("CREATE Database movie_booking");
}
console.log("Reset DB...");
run();
