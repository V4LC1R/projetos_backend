import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741988422406 implements MigrationInterface {
    name = 'Migration1741988422406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" "public"."event_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
    }

}
