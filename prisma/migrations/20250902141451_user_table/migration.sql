-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "password" TEXT NOT NULL,
    "profile" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
