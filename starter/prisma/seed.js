import { PrismaClient } from "@prisma/client";
// Aangepast tov Winc: "with" i.p.v. "assert" (Node 22+ kent "assert" niet)
import eventsData from "../src/data/events.json" with { type: "json" };
import userData from "../src/data/users.json" with { type: "json" };
import categoryData from "../src/data/categories.json" with { type: "json" };

// Verbinding met de database (log laat in de terminal zien wat Prisma doet)
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  // Haal de lijsten uit de JSON-bestanden
  const { events } = eventsData;
  const { users } = userData;
  const { categories } = categoryData;

  // Eerst de categorieën
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  // Dan de users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  // Als laatste de events (die verwijzen naar users en categorieën)
  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        image: event.image,
        // Koppel de categorieën via hun id's
        categories: {
          connect: event.categoryIds.map((id) => ({ id })),
        },
        // Aangepast t.o.v. Winc-oplossing: relatieveld heet "user" i.p.v. "createdBy"
        user: {
          connect: { id: event.createdBy },
        },
      },
    });
  }
}

// Script starten, en de verbinding altijd netjes sluiten
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
