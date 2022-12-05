-- CreateTable
CREATE TABLE "validAcess" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "validAcess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "validAcess_token_key" ON "validAcess"("token");

-- CreateIndex
CREATE UNIQUE INDEX "validAcess_user_key" ON "validAcess"("user");
