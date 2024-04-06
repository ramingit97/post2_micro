import { MigrationInterface, QueryRunner } from "typeorm";

export class Post1712323545354 implements MigrationInterface {
    name = 'Post1712323545354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "is_published" boolean NOT NULL, "author_id" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_query" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "is_published" boolean NOT NULL, "author_id" character varying NOT NULL, "author_name" character varying NOT NULL, "author_surname" character varying NOT NULL, CONSTRAINT "UQ_2909be4c3cf288bed132713c6f4" UNIQUE ("description"), CONSTRAINT "PK_b69ee9b7f44f6ac7ae2c7caa362" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post_query"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
