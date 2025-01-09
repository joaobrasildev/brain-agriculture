import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736380770446 implements MigrationInterface {
  name = 'Migration1736380770446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "farm" ADD "agriculturalCropsId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "producer" ADD "farmsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "farm" ADD CONSTRAINT "FK_787cf24678ecaad260bc38f83e5" FOREIGN KEY ("agriculturalCropsId") REFERENCES "agriculturalCrops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "FK_31a098f3fc891a92dc749b67514" FOREIGN KEY ("farmsId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "FK_31a098f3fc891a92dc749b67514"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" DROP CONSTRAINT "FK_787cf24678ecaad260bc38f83e5"`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "farmsId"`);
    await queryRunner.query(
      `ALTER TABLE "farm" DROP COLUMN "agriculturalCropsId"`,
    );
  }
}
