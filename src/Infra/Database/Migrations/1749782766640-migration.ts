import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749782766640 implements MigrationInterface {
    name = 'Migration1749782766640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "start_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "end_time" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "end_time" TIME WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "start_time" TIME WITH TIME ZONE NOT NULL`);
    }

}
