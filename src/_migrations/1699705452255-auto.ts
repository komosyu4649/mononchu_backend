import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699705452255 implements MigrationInterface {
    name = 'Auto1699705452255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stuff_want_conditions" ("id" SERIAL NOT NULL, "asset" integer NOT NULL, "period" character varying NOT NULL, "property" integer NOT NULL, "want_id" integer, CONSTRAINT "REL_95241144eea83751f84154418b" UNIQUE ("want_id"), CONSTRAINT "PK_2005de596680d5960f37f9ca80a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP COLUMN "conditions"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "FK_95241144eea83751f84154418b7" FOREIGN KEY ("want_id") REFERENCES "stuff_want"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "FK_95241144eea83751f84154418b7"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD "conditions" json NOT NULL`);
        await queryRunner.query(`DROP TABLE "stuff_want_conditions"`);
    }

}
