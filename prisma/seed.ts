const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const rewards = [
    {
      title: "New Workout Outfit",
      description: "Treat yourself to a new gym outfit",
      pointCost: 500,
    },
    {
      title: "Healthy Meal Delivery",
      description: "One week of healthy meal deliveries",
      pointCost: 1000,
    },
    {
      title: "Personal Training Session",
      description: "One-on-one session with a personal trainer",
      pointCost: 750,
    },
    {
      title: "Massage Therapy",
      description: "Relax with a 1-hour massage session",
      pointCost: 1200,
    },
    {
      title: "Fitness Tracker",
      description: "Latest model fitness tracker",
      pointCost: 2000,
    },
  ];

  for (let reward of rewards) {
    await prisma.reward.create({ data: reward });
  }

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
