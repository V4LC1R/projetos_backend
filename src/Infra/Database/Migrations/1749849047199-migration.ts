import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749849047199 implements MigrationInterface {
    name = 'Migration1749849047199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" ADD "active" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "area" ADD "active" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "active" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "event" ADD "active" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "active"`);
    }

}
