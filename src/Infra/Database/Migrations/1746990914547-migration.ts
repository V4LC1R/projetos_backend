import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746990914547 implements MigrationInterface {
    name = 'Migration1746990914547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "number_place" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" "public"."event_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number_place"`);
    }

}
