import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699194783532 implements MigrationInterface {
    name = 'Auto1699194783532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" ADD "property_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ADD "want_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ADD CONSTRAINT "FK_33ea770a247192e1d186f54fe71" FOREIGN KEY ("property_id") REFERENCES "stuff_property_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ADD CONSTRAINT "FK_dc07099de92d7ebf56af8e4f6a4" FOREIGN KEY ("want_id") REFERENCES "stuff_want_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" DROP CONSTRAINT "FK_dc07099de92d7ebf56af8e4f6a4"`);
        await queryRunner.query(`ALTER TABLE "stuff_category" DROP CONSTRAINT "FK_33ea770a247192e1d186f54fe71"`);
        await queryRunner.query(`ALTER TABLE "stuff_category" DROP COLUMN "want_id"`);
        await queryRunner.query(`ALTER TABLE "stuff_category" DROP COLUMN "property_id"`);
    }

}
