import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699366646890 implements MigrationInterface {
    name = 'Auto1699366646890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "property_registration_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "want_registration_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "want_total_amount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "want_total_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "want_registration_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stuff_category" ALTER COLUMN "property_registration_number" SET NOT NULL`);
    }

}
