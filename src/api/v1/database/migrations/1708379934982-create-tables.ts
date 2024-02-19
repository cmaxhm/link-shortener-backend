import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1708379934982 implements MigrationInterface {
  name = 'CreateTables1708379934982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "email" character varying(30), "password" character varying(100) NOT NULL, "created_at" date NOT NULL DEFAULT ('now'::text)::date, "updated_at" date NOT NULL DEFAULT ('now'::text)::date, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "links" ("id" SERIAL NOT NULL, "slug" character varying(20) NOT NULL, "url" text NOT NULL, "user_id" integer NOT NULL, "created_at" date NOT NULL DEFAULT ('now'::text)::date, "updated_at" date NOT NULL DEFAULT ('now'::text)::date, CONSTRAINT "UQ_54ebf5dec4e16cbf8f22d44caec" UNIQUE ("slug"), CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "links" ADD CONSTRAINT "FK_9f8dea86e48a7216c4f5369c1e4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "links" DROP CONSTRAINT "FK_9f8dea86e48a7216c4f5369c1e4"`);
    await queryRunner.query(`DROP TABLE "links"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
