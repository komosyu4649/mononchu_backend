import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699695135218 implements MigrationInterface {
    name = 'Auto1699695135218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD CONSTRAINT "FK_3b6e454bddc3908a013bfe28cf5" FOREIGN KEY ("category_id") REFERENCES "stuff_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP CONSTRAINT "FK_3b6e454bddc3908a013bfe28cf5"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP COLUMN "category_id"`);
    }

}
