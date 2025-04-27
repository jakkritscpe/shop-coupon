/*
  Warnings:

  - You are about to drop the column `categoryId` on the `content` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_categoryId_fkey";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "category";

-- CreateIndex
CREATE UNIQUE INDEX "content_title_key" ON "content"("title");
