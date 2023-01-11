import { MigrationInterface, QueryRunner } from "typeorm";

export class $1673236816878 implements MigrationInterface {
    name = '$1673236816878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "hash" text NOT NULL, "group_id" integer, "create_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, "description" text NOT NULL, "status" boolean NOT NULL, "user_id" integer NOT NULL, "create_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups_users" ("groups_id" integer NOT NULL, "users_id" integer NOT NULL, CONSTRAINT "PK_a10db7c2814cd53ca9598d12d66" PRIMARY KEY ("groups_id", "users_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0cca1782d4ec8cc3a7352f56f" ON "groups_users" ("groups_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9012013d9a93383ed4950efd60" ON "groups_users" ("users_id") `);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_users" ADD CONSTRAINT "FK_a0cca1782d4ec8cc3a7352f56f8" FOREIGN KEY ("groups_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "groups_users" ADD CONSTRAINT "FK_9012013d9a93383ed4950efd609" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_users" DROP CONSTRAINT "FK_9012013d9a93383ed4950efd609"`);
        await queryRunner.query(`ALTER TABLE "groups_users" DROP CONSTRAINT "FK_a0cca1782d4ec8cc3a7352f56f8"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9012013d9a93383ed4950efd60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0cca1782d4ec8cc3a7352f56f"`);
        await queryRunner.query(`DROP TABLE "groups_users"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }

}
