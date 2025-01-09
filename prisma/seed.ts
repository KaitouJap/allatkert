import { PrismaClient } from "@prisma/client";
import { fakerHU } from "@faker-js/faker";

const prisma = new PrismaClient();
const faker = fakerHU;

async function main(){
    for (let i = 0; i < 10; i++) {
        await prisma.animal.create({
            data: {
                name: faker.animal.petName(),
                species: faker.animal.type(),
                age: faker.number.int({min: 1, max: 20}),
                adopter: faker.datatype.boolean() ? faker.person.fullName() : null,
            },
        });
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
