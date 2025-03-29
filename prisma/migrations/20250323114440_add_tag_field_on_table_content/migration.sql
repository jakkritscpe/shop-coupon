/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "content_title_key";

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "content_tag_key" ON "content"("tag");
