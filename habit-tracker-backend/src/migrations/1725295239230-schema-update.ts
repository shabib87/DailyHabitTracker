import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1725295239230 implements MigrationInterface {
    name = 'SchemaUpdate1725295239230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "userId" integer, "habitId" integer, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tracker"("id", "date", "status", "userId", "habitId") SELECT "id", "date", "status", "userId", "habitId" FROM "tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
        await queryRunner.query(`ALTER TABLE "temporary_tracker" RENAME TO "tracker"`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" integer, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
        await queryRunner.query(`ALTER TABLE "temporary_tracker" RENAME TO "tracker"`);
        await queryRunner.query(`CREATE TABLE "temporary_reminder" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" integer, CONSTRAINT "FK_e983d605b4a0b8cc01e73f83c3b" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "reminder"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`ALTER TABLE "temporary_reminder" RENAME TO "reminder"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reminder" RENAME TO "temporary_reminder"`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" integer)`);
        await queryRunner.query(`INSERT INTO "reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "temporary_reminder"`);
        await queryRunner.query(`DROP TABLE "temporary_reminder"`);
        await queryRunner.query(`ALTER TABLE "tracker" RENAME TO "temporary_tracker"`);
        await queryRunner.query(`CREATE TABLE "tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "userId" integer, "habitId" integer, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`ALTER TABLE "tracker" RENAME TO "temporary_tracker"`);
        await queryRunner.query(`CREATE TABLE "tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "userId" integer, "habitId" integer, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_17912b7af07f165ed41afe0862c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tracker"("id", "date", "status", "userId", "habitId") SELECT "id", "date", "status", "userId", "habitId" FROM "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "temporary_tracker"`);
    }

}
