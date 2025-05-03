import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745443540581 implements MigrationInterface {
    name = 'Migration1745443540581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."schedule_status_enum" AS ENUM('available', 'unavailable', 'reserved')`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" date NOT NULL, "start_time" TIME WITH TIME ZONE NOT NULL, "end_time" TIME WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."schedule_status_enum" NOT NULL DEFAULT 'available', CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_71367c91dec0d28df24830863bb"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "area_id_seq" OWNED BY "area"."id"`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "id" SET DEFAULT nextval('"area_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" "public"."event_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_71367c91dec0d28df24830863bb" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_71367c91dec0d28df24830863bb"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "area_id_seq"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_71367c91dec0d28df24830863bb" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_status_enum"`);
    }

}
