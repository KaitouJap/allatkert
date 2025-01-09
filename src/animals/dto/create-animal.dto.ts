import { Prisma } from "@prisma/client";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateAnimalDto implements Prisma.AnimalCreateInput{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    species: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    adopter?: string | null;
}
