import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736363688238 implements MigrationInterface {
  name = 'Migration1736363688238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."documentType" AS ENUM('CPF', 'CNPJ')`,
    );
    await queryRunner.query(
      `CREATE TABLE "producer" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "documentId" character varying NOT NULL, "documentType" "public"."documentType" NOT NULL, CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "farm" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "producerId" uuid NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" integer NOT NULL, "agriculturalArea" integer NOT NULL, "vegetationArea" integer NOT NULL, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."crop" AS ENUM('WHEAT', 'RICE', 'CORN', 'BARLEY', 'OATS', 'SORGHUM', 'RYE', 'SOYBEANS', 'PEAS', 'LENTILS', 'CHICKPEAS', 'BEANS', 'POTATOES', 'SWEET_POTATOES', 'CASSAVA', 'CARROTS', 'BEETS', 'SUNFLOWER', 'CANOLA', 'PEANUTS', 'FLAXSEED', 'SESAME', 'COTTON', 'JUTE', 'HEMP', 'FLAX', 'APPLES', 'ORANGES', 'BANANAS', 'MANGOES', 'GRAPES', 'TOMATOES', 'ONIONS', 'LETTUCE', 'CABBAGE', 'CUCUMBERS', 'COFFEE', 'TEA', 'COCOA', 'ALFALFA', 'CLOVER', 'TIMOTHY_GRASS', 'SUGARCANE', 'SUGAR_BEETS', 'PEPPER', 'GINGER', 'TURMERIC', 'VANILLA', 'ALOE_VERA', 'MINT', 'LAVENDER', 'CHAMOMILE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."landUse" AS ENUM('AGRICULTURAL', 'VEGETATION')`,
    );
    await queryRunner.query(
      `CREATE TABLE "agriculturalCrops" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "harvest" integer NOT NULL, "crop" "public"."crop" NOT NULL, "farmId" uuid NOT NULL, "landuse" "public"."landUse" NOT NULL, "area" integer NOT NULL, CONSTRAINT "PK_36b841cbe81d82c918c599bc328" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "agriculturalCrops"`);
    await queryRunner.query(`DROP TYPE "public"."landUse"`);
    await queryRunner.query(`DROP TYPE "public"."crop"`);
    await queryRunner.query(`DROP TABLE "farm"`);
    await queryRunner.query(`DROP TABLE "producer"`);
    await queryRunner.query(`DROP TYPE "public"."documentType"`);
  }
}
