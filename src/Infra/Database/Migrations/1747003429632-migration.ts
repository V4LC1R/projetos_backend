import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747003429632 implements MigrationInterface {
    name = 'Migration1747003429632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" "public"."event_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_56f6c7f24477021c78871414ac0"`);
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "REL_56f6c7f24477021c78871414ac"`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_56f6c7f24477021c78871414ac0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_56f6c7f24477021c78871414ac0"`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "REL_56f6c7f24477021c78871414ac" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_56f6c7f24477021c78871414ac0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" event_type_enum NOT NULL`);
    }

}
