/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `config` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `linkContact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "config_name_key" ON "config"("name");

-- CreateIndex
CREATE UNIQUE INDEX "linkContact_name_key" ON "linkContact"("name");
