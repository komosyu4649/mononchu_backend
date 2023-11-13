import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699694320827 implements MigrationInterface {
    name = 'Auto1699694320827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stuff_want" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "thumbnail" character varying, "score" integer, "price" integer, "brand" character varying, "url" character varying, "conditions" json NOT NULL, CONSTRAINT "PK_91c0e954064b1464d38b74ae8a5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stuff_want"`);
    }

}
