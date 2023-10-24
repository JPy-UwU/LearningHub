// script to seed the database with some data
// run with: node scrpit/seed.ts

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
      await database.category.createMany({
        data: [
          { name: "Computer Science" },
          { name: "Music" },
          { name: "Fitness" },
          { name: "Engineering" },
          { name: "Filming" },
          { name: "Biology" },
          { name: "Accounting" },
          { name: "Cooking" },
        ],
      });
      console.log("Seeding finished.");
  } catch (error) {
    console.error(error);
  } finally {
    await database.$disconnect();
  }
}

main();