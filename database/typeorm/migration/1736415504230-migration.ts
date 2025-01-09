import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736415504230 implements MigrationInterface {
  name = 'Migration1736415504230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "agriculturalCrops" DROP COLUMN "landuse"`,
    );
    await queryRunner.query(`DROP TYPE "public"."landUse"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."landUse" AS ENUM('AGRICULTURAL', 'VEGETATION')`,
    );
    await queryRunner.query(
      `ALTER TABLE "agriculturalCrops" ADD "landuse" "public"."landUse" NOT NULL`,
    );
  }
}
