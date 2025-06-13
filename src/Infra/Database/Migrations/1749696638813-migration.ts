import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749696638813 implements MigrationInterface {
    name = 'Migration1749696638813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" date NOT NULL, "start_time" TIME WITH TIME ZONE NOT NULL, "end_time" TIME WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'unavailable', "eventId" integer, "areaId" integer, "guestId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "number_place" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "district" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "complement" text NOT NULL, "latitude" character varying(255) NOT NULL, "longitude" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaId" integer, CONSTRAINT "REL_05f97ae4517f30cac2782813a9" UNIQUE ("areaId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "area" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "rent" numeric(10,3) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(512) NOT NULL, "cellphone" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "type" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaId" integer, "ownerId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_24150cc10b6ec1f56829c362b46" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_be0231603fef0c671cc4e6ed785" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_c7dd86b4ebb1a1a62842b6d4a1d" FOREIGN KEY ("guestId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_05f97ae4517f30cac2782813a93" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_56f6c7f24477021c78871414ac0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_71367c91dec0d28df24830863bb" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_71367c91dec0d28df24830863bb"`);
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_56f6c7f24477021c78871414ac0"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_05f97ae4517f30cac2782813a93"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_c7dd86b4ebb1a1a62842b6d4a1d"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_be0231603fef0c671cc4e6ed785"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_24150cc10b6ec1f56829c362b46"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "area"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
    }

}
