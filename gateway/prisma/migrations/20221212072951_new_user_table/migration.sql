/*
  Warnings:

  - You are about to drop the column `user` on the `validAccess` table. All the data in the column will be lost.
  - Added the required column `are_valid` to the `validAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `validAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "validAccess_user_key";

-- AlterTable
ALTER TABLE "validAccess" DROP COLUMN "user",
ADD COLUMN     "are_valid" BOOLEAN NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("user");

-- AddForeignKey
ALTER TABLE "validAccess" ADD CONSTRAINT "validAccess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
