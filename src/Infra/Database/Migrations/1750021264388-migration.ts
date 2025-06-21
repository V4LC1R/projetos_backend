import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750021264388 implements MigrationInterface {
    name = 'Migration1750021264388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "latitude" numeric(10,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "longitude" numeric(11,8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "longitude" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "latitude" character varying(255) NOT NULL`);
    }

}
