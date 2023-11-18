import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1699711552163 implements MigrationInterface {
    name = 'Auto1699711552163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "FK_95241144eea83751f84154418b7"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP CONSTRAINT "FK_2005de596680d5960f37f9ca80a"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" RENAME COLUMN "want_id" TO "stuff_want"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" RENAME CONSTRAINT "UQ_95241144eea83751f84154418b7" TO "UQ_0bcc2fee178310f526e7e101c70"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" RENAME COLUMN "conditions_id" TO "stuff_want_conditions"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" RENAME CONSTRAINT "UQ_2005de596680d5960f37f9ca80a" TO "UQ_3bd1187c65601ae3a9b39361737"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "FK_0bcc2fee178310f526e7e101c70" FOREIGN KEY ("stuff_want") REFERENCES "stuff_want"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD CONSTRAINT "FK_3bd1187c65601ae3a9b39361737" FOREIGN KEY ("stuff_want_conditions") REFERENCES "stuff_want_conditions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuff_want" DROP CONSTRAINT "FK_3bd1187c65601ae3a9b39361737"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" DROP CONSTRAINT "FK_0bcc2fee178310f526e7e101c70"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" RENAME CONSTRAINT "UQ_3bd1187c65601ae3a9b39361737" TO "UQ_2005de596680d5960f37f9ca80a"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" RENAME COLUMN "stuff_want_conditions" TO "conditions_id"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" RENAME CONSTRAINT "UQ_0bcc2fee178310f526e7e101c70" TO "UQ_95241144eea83751f84154418b7"`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" RENAME COLUMN "stuff_want" TO "want_id"`);
        await queryRunner.query(`ALTER TABLE "stuff_want" ADD CONSTRAINT "FK_2005de596680d5960f37f9ca80a" FOREIGN KEY ("conditions_id") REFERENCES "stuff_want_conditions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuff_want_conditions" ADD CONSTRAINT "FK_95241144eea83751f84154418b7" FOREIGN KEY ("want_id") REFERENCES "stuff_want"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
