import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750542537140 implements MigrationInterface {
    name = 'Migration1750542537140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_6782d3191a1af2c09bd1d0a0b94"`);
        await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "guestId" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_b0bd2891a8b79161510e982148c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_b0bd2891a8b79161510e982148c"`);
        await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "ownerId" TO "guestId"`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_6782d3191a1af2c09bd1d0a0b94" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
