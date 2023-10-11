import { MigrationInterface, QueryRunner } from "typeorm";

export class ForLive1697029797272 implements MigrationInterface {
    name = 'ForLive1697029797272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "qr_code" ("id" SERIAL NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "code" character varying NOT NULL, "movies" jsonb array DEFAULT '{}', CONSTRAINT "PK_21be15bed42505b3cddf438a037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "year" character varying NOT NULL, "images" text array DEFAULT '{}', "code" character varying, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "qr_code"`);
    }

}
