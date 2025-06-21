import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750542267328 implements MigrationInterface {
    name = 'Migration1750542267328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_c7dd86b4ebb1a1a62842b6d4a1d"`);
        await queryRunner.query(`CREATE TABLE "request" ("id" SERIAL NOT NULL, "message" text NOT NULL, "active" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaId" integer, "ownerId" integer, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_schedule" ("request_id" integer NOT NULL, "schedule_id" integer NOT NULL, CONSTRAINT "PK_2aa342dac964045858cf951d848" PRIMARY KEY ("request_id", "schedule_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1885937ae70258926ea49585fd" ON "request_schedule" ("request_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc304a1563abf01e328d7d7c55" ON "request_schedule" ("schedule_id") `);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "guestId"`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_4559bd27f95d30b1e7ebd1a2a31" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_b0bd2891a8b79161510e982148c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_schedule" ADD CONSTRAINT "FK_1885937ae70258926ea49585fde" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "request_schedule" ADD CONSTRAINT "FK_fc304a1563abf01e328d7d7c557" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_schedule" DROP CONSTRAINT "FK_fc304a1563abf01e328d7d7c557"`);
        await queryRunner.query(`ALTER TABLE "request_schedule" DROP CONSTRAINT "FK_1885937ae70258926ea49585fde"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_b0bd2891a8b79161510e982148c"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_4559bd27f95d30b1e7ebd1a2a31"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "guestId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc304a1563abf01e328d7d7c55"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1885937ae70258926ea49585fd"`);
        await queryRunner.query(`DROP TABLE "request_schedule"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_c7dd86b4ebb1a1a62842b6d4a1d" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
