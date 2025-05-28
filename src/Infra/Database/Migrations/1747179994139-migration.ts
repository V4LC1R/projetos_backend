import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747179994139 implements MigrationInterface {
    name = 'Migration1747179994139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
    }

}
