import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736415616402 implements MigrationInterface {
  name = 'Migration1736415616402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."landUse" AS ENUM('AGRICULTURAL', 'VEGETATION')`,
    );
    await queryRunner.query(
      `ALTER TABLE "agriculturalCrops" ADD "landUse" "public"."landUse" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "agriculturalCrops" DROP COLUMN "landUse"`,
    );
    await queryRunner.query(`DROP TYPE "public"."landUse"`);
  }
}
