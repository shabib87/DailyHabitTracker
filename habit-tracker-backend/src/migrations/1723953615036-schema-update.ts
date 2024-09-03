import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1723953615036 implements MigrationInterface {
    name = 'SchemaUpdate1723953615036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "habit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_habit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" integer, CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`ALTER TABLE "temporary_habit" RENAME TO "habit"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" RENAME TO "temporary_habit"`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "habit"`);
    }

}
