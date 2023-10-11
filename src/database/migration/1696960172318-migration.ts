import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696960172318 implements MigrationInterface {
    name = 'Migration1696960172318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "code" SET NOT NULL`);
    }

}
