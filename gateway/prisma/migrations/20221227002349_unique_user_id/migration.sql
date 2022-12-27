/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `validAccess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "validAccess_user_id_key" ON "validAccess"("user_id");
