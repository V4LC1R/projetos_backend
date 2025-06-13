import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749853902001 implements MigrationInterface {
    name = 'Migration1749853902001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "area_category" ("area_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_3948164fac5073fd105d5c78937" PRIMARY KEY ("area_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dfc675a259b26be6ed05b3c76a" ON "area_category" ("area_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_429263efedb3c90776a6814bde" ON "area_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "area_category" ADD CONSTRAINT "FK_dfc675a259b26be6ed05b3c76a5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_category" ADD CONSTRAINT "FK_429263efedb3c90776a6814bde8" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_category" DROP CONSTRAINT "FK_429263efedb3c90776a6814bde8"`);
        await queryRunner.query(`ALTER TABLE "area_category" DROP CONSTRAINT "FK_dfc675a259b26be6ed05b3c76a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_429263efedb3c90776a6814bde"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dfc675a259b26be6ed05b3c76a"`);
        await queryRunner.query(`DROP TABLE "area_category"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
