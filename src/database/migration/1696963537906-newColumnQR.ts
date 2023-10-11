import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnQR1696963537906 implements MigrationInterface {
    name = 'NewColumnQR1696963537906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "qr_code" ADD "movies" jsonb array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "qr_code" DROP COLUMN "movies"`);
    }

}
