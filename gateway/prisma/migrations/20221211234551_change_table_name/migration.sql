/*
  Warnings:

  - You are about to drop the `validAcess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "validAcess";

-- CreateTable
CREATE TABLE "validAccess" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "validAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "validAccess_token_key" ON "validAccess"("token");

-- CreateIndex
CREATE UNIQUE INDEX "validAccess_user_key" ON "validAccess"("user");
