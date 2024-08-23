import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1724375391142 implements MigrationInterface {
    name = 'SchemaUpdate1724375391142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "userId" integer, "habitId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "userId" integer, "habitId" integer, CONSTRAINT "FK_17912b7af07f165ed41afe0862c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tracker"("id", "date", "status", "userId", "habitId") SELECT "id", "date", "status", "userId", "habitId" FROM "tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
        await queryRunner.query(`ALTER TABLE "temporary_tracker" RENAME TO "tracker"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracker" RENAME TO "temporary_tracker"`);
        await queryRunner.query(`CREATE TABLE "tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "userId" integer, "habitId" integer)`);
        await queryRunner.query(`INSERT INTO "tracker"("id", "date", "status", "userId", "habitId") SELECT "id", "date", "status", "userId", "habitId" FROM "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
    }

}
