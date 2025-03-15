import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741991719981 implements MigrationInterface {
    name = 'Migration1741991719981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "event_id_seq" OWNED BY "event"."id"`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "id" SET DEFAULT nextval('"event_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" "public"."event_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_56f6c7f24477021c78871414ac0"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_56f6c7f24477021c78871414ac0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_56f6c7f24477021c78871414ac0"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_56f6c7f24477021c78871414ac0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "event_id_seq"`);
    }

}
