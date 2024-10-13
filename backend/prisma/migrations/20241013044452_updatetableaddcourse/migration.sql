-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_usernameId_fkey";

-- AlterTable
ALTER TABLE "StudentCourse" ALTER COLUMN "usernameId" DROP NOT NULL;
