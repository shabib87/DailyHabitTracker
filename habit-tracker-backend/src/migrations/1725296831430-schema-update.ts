import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1725296831430 implements MigrationInterface {
    name = 'SchemaUpdate1725296831430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "password") SELECT "id", "username", "email", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
        await queryRunner.query(`ALTER TABLE "temporary_tracker" RENAME TO "tracker"`);
        await queryRunner.query(`CREATE TABLE "temporary_tracker" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
        await queryRunner.query(`ALTER TABLE "temporary_tracker" RENAME TO "tracker"`);
        await queryRunner.query(`CREATE TABLE "temporary_reminder" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "reminder"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`ALTER TABLE "temporary_reminder" RENAME TO "reminder"`);
        await queryRunner.query(`CREATE TABLE "temporary_reminder" ("id" varchar PRIMARY KEY NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "reminder"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`ALTER TABLE "temporary_reminder" RENAME TO "reminder"`);
        await queryRunner.query(`CREATE TABLE "temporary_habit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`ALTER TABLE "temporary_habit" RENAME TO "habit"`);
        await queryRunner.query(`CREATE TABLE "temporary_habit" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`ALTER TABLE "temporary_habit" RENAME TO "habit"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "password") SELECT "id", "username", "email", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_tracker" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" varchar, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "tracker"`);
        await queryRunner.query(`DROP TABLE "tracker"`);
        await queryRunner.query(`ALTER TABLE "temporary_tracker" RENAME TO "tracker"`);
        await queryRunner.query(`CREATE TABLE "temporary_reminder" ("id" varchar PRIMARY KEY NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" varchar, CONSTRAINT "FK_e983d605b4a0b8cc01e73f83c3b" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "reminder"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`ALTER TABLE "temporary_reminder" RENAME TO "reminder"`);
        await queryRunner.query(`CREATE TABLE "temporary_habit" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" varchar, CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`ALTER TABLE "temporary_habit" RENAME TO "habit"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit" RENAME TO "temporary_habit"`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "temporary_habit"`);
        await queryRunner.query(`ALTER TABLE "reminder" RENAME TO "temporary_reminder"`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" varchar PRIMARY KEY NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" varchar)`);
        await queryRunner.query(`INSERT INTO "reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "temporary_reminder"`);
        await queryRunner.query(`DROP TABLE "temporary_reminder"`);
        await queryRunner.query(`ALTER TABLE "tracker" RENAME TO "temporary_tracker"`);
        await queryRunner.query(`CREATE TABLE "tracker" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" varchar)`);
        await queryRunner.query(`INSERT INTO "tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "temporary_tracker"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "password") SELECT "id", "username", "email", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "habit" RENAME TO "temporary_habit"`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "temporary_habit"`);
        await queryRunner.query(`ALTER TABLE "habit" RENAME TO "temporary_habit"`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "userId" integer, CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "habit"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "temporary_habit"`);
        await queryRunner.query(`DROP TABLE "temporary_habit"`);
        await queryRunner.query(`ALTER TABLE "reminder" RENAME TO "temporary_reminder"`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" integer)`);
        await queryRunner.query(`INSERT INTO "reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "temporary_reminder"`);
        await queryRunner.query(`DROP TABLE "temporary_reminder"`);
        await queryRunner.query(`ALTER TABLE "reminder" RENAME TO "temporary_reminder"`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reminderTime" datetime NOT NULL, "message" text, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "habitId" integer, CONSTRAINT "FK_e983d605b4a0b8cc01e73f83c3b" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "reminder"("id", "reminderTime", "message", "isActive", "createdAt", "habitId") SELECT "id", "reminderTime", "message", "isActive", "createdAt", "habitId" FROM "temporary_reminder"`);
        await queryRunner.query(`DROP TABLE "temporary_reminder"`);
        await queryRunner.query(`ALTER TABLE "tracker" RENAME TO "temporary_tracker"`);
        await queryRunner.query(`CREATE TABLE "tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" integer)`);
        await queryRunner.query(`INSERT INTO "tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "temporary_tracker"`);
        await queryRunner.query(`ALTER TABLE "tracker" RENAME TO "temporary_tracker"`);
        await queryRunner.query(`CREATE TABLE "tracker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "status" boolean NOT NULL, "habitId" integer, CONSTRAINT "FK_aa9429b932486c449b759eba664" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tracker"("id", "date", "status", "habitId") SELECT "id", "date", "status", "habitId" FROM "temporary_tracker"`);
        await queryRunner.query(`DROP TABLE "temporary_tracker"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "password") SELECT "id", "username", "email", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
