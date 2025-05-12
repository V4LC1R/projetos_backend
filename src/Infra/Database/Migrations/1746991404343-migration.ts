import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746991404343 implements MigrationInterface {
    name = 'Migration1746991404343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "areaId" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_05f97ae4517f30cac2782813a93" UNIQUE ("areaId")`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" "public"."event_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_05f97ae4517f30cac2782813a93" FOREIGN KEY ("areaId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_05f97ae4517f30cac2782813a93"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_05f97ae4517f30cac2782813a93"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "areaId"`);
    }

}
