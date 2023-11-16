import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699577191205 implements MigrationInterface {
    name = 'Auto1699577191205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stuff_property" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "thumbnail" character varying, "score" integer, "price" integer, "address" character varying, "purchase_date" character varying, "purchase_place" character varying, CONSTRAINT "PK_db9080d77bb2f4e78a075a5be23" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stuff_property"`);
    }

}
