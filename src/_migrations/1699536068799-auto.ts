import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699536068799 implements MigrationInterface {
    name = 'Auto1699536068799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" ADD "icon" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" DROP COLUMN "icon"`);
    }

}
