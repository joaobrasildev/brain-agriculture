import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736361366375 implements MigrationInterface {
  name = 'Migration1736361366375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "producer" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "documentId" character varying NOT NULL, "documentType" "public"."documentType" NOT NULL, CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "farm" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "producerId" uuid NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" integer NOT NULL, "agriculturalArea" integer NOT NULL, "vegetationArea" integer NOT NULL, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agriculturalCrops" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "harvest" integer NOT NULL, "crop" "public"."crop" NOT NULL, "farmId" uuid NOT NULL, "Landuse" "public"."landUse" NOT NULL, "area" integer NOT NULL, CONSTRAINT "PK_36b841cbe81d82c918c599bc328" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "agriculturalCrops"`);
    await queryRunner.query(`DROP TABLE "farm"`);
    await queryRunner.query(`DROP TABLE "producer"`);
  }
}
