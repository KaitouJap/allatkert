import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaService } from 'src/prisma.service';
import { Animal } from '@prisma/client';


@Injectable()
export class AnimalsService {

  db: PrismaService; 
  constructor(db: PrismaService) {
    this.db = db;
  }

  /**
   * Creates a new animal in the database
   * @param createAnimalDto Data to create the animal
   */
  async create(createAnimalDto: CreateAnimalDto): Promise<void> {
    await this.db.animal.create({
      data: createAnimalDto
    });
  }

  /**
   * Retrieves all animals from the database
   * @returns A promise that resolves to an array of animals
   */
  async findAll(): Promise<Animal[]>{
    return await this.db.animal.findMany();
  }

  /**
   * Retrieves a single animal from the database
   * @param id The id of the animal to retrieve
   * @returns A promise that resolves to an animal
   * @throws NotFoundException if the animal is not found
   */
  async findOne(id: number): Promise<Animal> {
    const animal = await this.db.animal.findUnique({
      where: {id: id}
    });
    if(!animal) throw new NotFoundException(`Animal with id ${id} not found`);
    return animal;
  }

  /**
   * Updates an animal in the database
   * @param id The id of the animal to update
   * @param updateAnimalDto Data to be updated in the animal
   * @returns The updated animal
   * @exception NotFoundException if the animal is not found
   */
  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    await this.findOne(id);
    return await this.db.animal.update({
      where: {id: id},
      data: updateAnimalDto
    });
  }

  /**
   * Removes an animal from the database
   * @param id The id of the animal to remove
   * @exception NotFoundException if the animal is not found
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.db.animal.delete({
      where: {id: id}
    });
  }
}
