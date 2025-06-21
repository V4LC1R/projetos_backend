import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750019097184 implements MigrationInterface {
    name = 'Migration1750019097184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "number_place" character varying(255), "country" character varying(255) NOT NULL, "district" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "complement" text, "latitude" numeric(10,8) NOT NULL, "longitude" numeric(11,8) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaId" integer, CONSTRAINT "REL_960521a5a1bcb86f440ef6c814" UNIQUE ("areaId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_960521a5a1bcb86f440ef6c8146" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_960521a5a1bcb86f440ef6c8146"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
