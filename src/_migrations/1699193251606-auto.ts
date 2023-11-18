import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699193251606 implements MigrationInterface {
    name = 'Auto1699193251606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stuff_property_status" ("id" SERIAL NOT NULL, "registration_number" integer NOT NULL, "limited_number" integer NOT NULL, CONSTRAINT "PK_9e63a27264efa3c58f76f40a8a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stuff_want_status" ("id" SERIAL NOT NULL, "registration_number" integer NOT NULL, "total_amount" integer NOT NULL, CONSTRAINT "PK_dd6bc752c5b15f9b691235839ee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stuff_want_status"`);
        await queryRunner.query(`DROP TABLE "stuff_property_status"`);
    }

}
