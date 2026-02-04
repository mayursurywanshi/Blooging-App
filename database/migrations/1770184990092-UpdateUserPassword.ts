import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserPassword1770184990092 implements MigrationInterface {
    name = 'UpdateUserPassword1770184990092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tokens" ("token" string PRIMARY KEY NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tokens"("token", "userId") SELECT "token", "userId" FROM "tokens"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`ALTER TABLE "temporary_tokens" RENAME TO "tokens"`);
        await queryRunner.query(`CREATE TABLE "temporary_reactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(255) NOT NULL, "userId" integer NOT NULL, "articleId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_reactions"("id", "category", "userId", "articleId") SELECT "id", "category", "userId", "articleId" FROM "reactions"`);
        await queryRunner.query(`DROP TABLE "reactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_reactions" RENAME TO "reactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_articles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "slug" varchar(255) NOT NULL, "content" varchar(65536) NOT NULL, "image" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "userId" integer NOT NULL, "published" boolean NOT NULL DEFAULT (false), "published_at" datetime, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "UQ_bdbf8f8e5ffb2c60eb3b8875fee" UNIQUE ("image"))`);
        await queryRunner.query(`INSERT INTO "temporary_articles"("id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at") SELECT "id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at" FROM "articles"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`ALTER TABLE "temporary_articles" RENAME TO "articles"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "handle" varchar(255) NOT NULL, "image" varchar(255), "registrationToken" varchar(255), "loginToken" varchar(255), "password" varchar NOT NULL, CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379" UNIQUE ("image"), CONSTRAINT "UQ_6a7e5f591436179c411f5308a9e" UNIQUE ("handle"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "name", "handle", "image", "registrationToken", "loginToken") SELECT "id", "email", "name", "handle", "image", "registrationToken", "loginToken" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_tokens" ("token" varchar PRIMARY KEY NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_tokens"("token", "userId") SELECT "token", "userId" FROM "tokens"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`ALTER TABLE "temporary_tokens" RENAME TO "tokens"`);
        await queryRunner.query(`CREATE TABLE "temporary_reactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "userId" integer, "articleId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_reactions"("id", "category", "userId", "articleId") SELECT "id", "category", "userId", "articleId" FROM "reactions"`);
        await queryRunner.query(`DROP TABLE "reactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_reactions" RENAME TO "reactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_articles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" varchar NOT NULL, "image" varchar, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer, "published" boolean NOT NULL DEFAULT (0), "published_at" datetime, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "UQ_bdbf8f8e5ffb2c60eb3b8875fee" UNIQUE ("image"))`);
        await queryRunner.query(`INSERT INTO "temporary_articles"("id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at") SELECT "id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at" FROM "articles"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`ALTER TABLE "temporary_articles" RENAME TO "articles"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "handle" varchar NOT NULL, "image" varchar, "registrationToken" varchar, "loginToken" varchar, "password" varchar NOT NULL, CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379" UNIQUE ("image"), CONSTRAINT "UQ_6a7e5f591436179c411f5308a9e" UNIQUE ("handle"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "name", "handle", "image", "registrationToken", "loginToken", "password") SELECT "id", "email", "name", "handle", "image", "registrationToken", "loginToken", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_tokens" ("token" varchar PRIMARY KEY NOT NULL, "userId" integer, CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tokens"("token", "userId") SELECT "token", "userId" FROM "tokens"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`ALTER TABLE "temporary_tokens" RENAME TO "tokens"`);
        await queryRunner.query(`CREATE TABLE "temporary_reactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "userId" integer, "articleId" integer, CONSTRAINT "FK_f3e1d278edeb2c19a2ddad83f8e" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0cca45fe8545709bd53755f19d5" FOREIGN KEY ("articleId") REFERENCES "articles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reactions"("id", "category", "userId", "articleId") SELECT "id", "category", "userId", "articleId" FROM "reactions"`);
        await queryRunner.query(`DROP TABLE "reactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_reactions" RENAME TO "reactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_articles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" varchar NOT NULL, "image" varchar, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer, "published" boolean NOT NULL DEFAULT (0), "published_at" datetime, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "UQ_bdbf8f8e5ffb2c60eb3b8875fee" UNIQUE ("image"), CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_articles"("id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at") SELECT "id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at" FROM "articles"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`ALTER TABLE "temporary_articles" RENAME TO "articles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME TO "temporary_articles"`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" varchar NOT NULL, "image" varchar, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer, "published" boolean NOT NULL DEFAULT (0), "published_at" datetime, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "UQ_bdbf8f8e5ffb2c60eb3b8875fee" UNIQUE ("image"))`);
        await queryRunner.query(`INSERT INTO "articles"("id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at") SELECT "id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at" FROM "temporary_articles"`);
        await queryRunner.query(`DROP TABLE "temporary_articles"`);
        await queryRunner.query(`ALTER TABLE "reactions" RENAME TO "temporary_reactions"`);
        await queryRunner.query(`CREATE TABLE "reactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "userId" integer, "articleId" integer)`);
        await queryRunner.query(`INSERT INTO "reactions"("id", "category", "userId", "articleId") SELECT "id", "category", "userId", "articleId" FROM "temporary_reactions"`);
        await queryRunner.query(`DROP TABLE "temporary_reactions"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("token" varchar PRIMARY KEY NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "tokens"("token", "userId") SELECT "token", "userId" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "handle" varchar(255) NOT NULL, "image" varchar(255), "registrationToken" varchar(255), "loginToken" varchar(255), "password" varchar NOT NULL, CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379" UNIQUE ("image"), CONSTRAINT "UQ_6a7e5f591436179c411f5308a9e" UNIQUE ("handle"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "name", "handle", "image", "registrationToken", "loginToken", "password") SELECT "id", "email", "name", "handle", "image", "registrationToken", "loginToken", "password" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME TO "temporary_articles"`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "slug" varchar(255) NOT NULL, "content" varchar(65536) NOT NULL, "image" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "userId" integer NOT NULL, "published" boolean NOT NULL DEFAULT (false), "published_at" datetime, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "UQ_bdbf8f8e5ffb2c60eb3b8875fee" UNIQUE ("image"))`);
        await queryRunner.query(`INSERT INTO "articles"("id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at") SELECT "id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at" FROM "temporary_articles"`);
        await queryRunner.query(`DROP TABLE "temporary_articles"`);
        await queryRunner.query(`ALTER TABLE "reactions" RENAME TO "temporary_reactions"`);
        await queryRunner.query(`CREATE TABLE "reactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(255) NOT NULL, "userId" integer NOT NULL, "articleId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "reactions"("id", "category", "userId", "articleId") SELECT "id", "category", "userId", "articleId" FROM "temporary_reactions"`);
        await queryRunner.query(`DROP TABLE "temporary_reactions"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("token" string PRIMARY KEY NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tokens"("token", "userId") SELECT "token", "userId" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "handle" varchar(255) NOT NULL, "image" varchar(255), "registrationToken" varchar(255), "loginToken" varchar(255), CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379" UNIQUE ("image"), CONSTRAINT "UQ_6a7e5f591436179c411f5308a9e" UNIQUE ("handle"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "name", "handle", "image", "registrationToken", "loginToken") SELECT "id", "email", "name", "handle", "image", "registrationToken", "loginToken" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME TO "temporary_articles"`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "slug" varchar(255) NOT NULL, "content" varchar(65536) NOT NULL, "image" varchar(255), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "userId" integer NOT NULL, "published" boolean NOT NULL DEFAULT (false), "published_at" datetime, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "UQ_bdbf8f8e5ffb2c60eb3b8875fee" UNIQUE ("image"), CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "articles"("id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at") SELECT "id", "title", "slug", "content", "image", "created_at", "updated_at", "userId", "published", "published_at" FROM "temporary_articles"`);
        await queryRunner.query(`DROP TABLE "temporary_articles"`);
        await queryRunner.query(`ALTER TABLE "reactions" RENAME TO "temporary_reactions"`);
        await queryRunner.query(`CREATE TABLE "reactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(255) NOT NULL, "userId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "FK_0cca45fe8545709bd53755f19d5" FOREIGN KEY ("articleId") REFERENCES "articles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_f3e1d278edeb2c19a2ddad83f8e" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "reactions"("id", "category", "userId", "articleId") SELECT "id", "category", "userId", "articleId" FROM "temporary_reactions"`);
        await queryRunner.query(`DROP TABLE "temporary_reactions"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("token" string PRIMARY KEY NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tokens"("token", "userId") SELECT "token", "userId" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
    }

}
