import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750988651913 implements MigrationInterface {
    name = 'Migration1750988651913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "nameEvent" text DEFAULT 'S/N'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "nameEvent"`);
    }

}
