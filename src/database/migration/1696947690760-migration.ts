import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696947690760 implements MigrationInterface {
    name = 'Migration1696947690760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "year" character varying NOT NULL, "images" text array DEFAULT '{}', "code" character varying NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "qr_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "code" character varying NOT NULL, CONSTRAINT "PK_21be15bed42505b3cddf438a037" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "qr_code"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
