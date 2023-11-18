import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699710349360 implements MigrationInterface {
    name = 'Auto1699710349360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "FK_95241144eea83751f84154418b7"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP CONSTRAINT "FK_2005de596680d5960f37f9ca80a"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "UQ_95241144eea83751f84154418b7"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP COLUMN "want_id"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP CONSTRAINT "UQ_2005de596680d5960f37f9ca80a"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP COLUMN "conditions_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD "conditions_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD CONSTRAINT "UQ_2005de596680d5960f37f9ca80a" UNIQUE ("conditions_id")`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD "want_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "UQ_95241144eea83751f84154418b7" UNIQUE ("want_id")`);
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD CONSTRAINT "FK_2005de596680d5960f37f9ca80a" FOREIGN KEY ("conditions_id") REFERENCES "stuff_want_conditions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "FK_95241144eea83751f84154418b7" FOREIGN KEY ("want_id") REFERENCES "stuff_want"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
