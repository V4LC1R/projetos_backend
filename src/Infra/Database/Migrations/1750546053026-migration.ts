import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750546053026 implements MigrationInterface {
    name = 'Migration1750546053026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "status" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "status"`);
    }

}
