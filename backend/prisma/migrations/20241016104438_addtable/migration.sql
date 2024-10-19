/*
  Warnings:

  - You are about to drop the column `usernameId` on the `CourseTransfer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseTransfer" DROP CONSTRAINT "CourseTransfer_usernameId_fkey";

-- AlterTable
ALTER TABLE "CourseTransfer" DROP COLUMN "usernameId";
