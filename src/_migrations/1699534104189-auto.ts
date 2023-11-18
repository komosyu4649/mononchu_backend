import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699534104189 implements MigrationInterface {
    name = 'Auto1699534104189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "rank" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "rank" SET NOT NULL`);
    }

}
