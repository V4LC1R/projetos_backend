import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750380225410 implements MigrationInterface {
    name = 'Migration1750380225410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "status" SET DEFAULT 'available'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "status" SET DEFAULT 'unavailable'`);
    }

}
