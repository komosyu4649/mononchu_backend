import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699587709127 implements MigrationInterface {
    name = 'Auto1699587709127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_property" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "stuff_property" ADD CONSTRAINT "FK_1cb664179713e1d8256b9eec47d" FOREIGN KEY ("category_id") REFERENCES "stuff_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_property" DROP CONSTRAINT "FK_1cb664179713e1d8256b9eec47d"`);
        await queryRunner.query(`ALTER TABLE "stuff_property" DROP COLUMN "category_id"`);
    }

}
