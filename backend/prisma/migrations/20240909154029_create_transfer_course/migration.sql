/*
  Warnings:

  - You are about to drop the column `descriptions` on the `TransferCourse` table. All the data in the column will be lost.
  - Added the required column `description` to the `TransferCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransferCourse" DROP COLUMN "descriptions",
ADD COLUMN     "description" TEXT NOT NULL;
