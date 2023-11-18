import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699104910797 implements MigrationInterface {
    name = 'Auto1699104910797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stuff_category" ("id" SERIAL NOT NULL, "rank" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8624bfc5eaef0a3b5313836dc60" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stuff_category"`);
    }

}
