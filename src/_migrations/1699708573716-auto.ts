import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699708573716 implements MigrationInterface {
    name = 'Auto1699708573716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "FK_95241144eea83751f84154418b7"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "REL_95241144eea83751f84154418b"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP COLUMN "want_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD "want_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "REL_95241144eea83751f84154418b" UNIQUE ("want_id")`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "FK_95241144eea83751f84154418b7" FOREIGN KEY ("want_id") REFERENCES "stuff_want"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
