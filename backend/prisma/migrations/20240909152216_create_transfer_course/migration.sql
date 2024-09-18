/*
  Warnings:

  - You are about to drop the column `credits` on the `TransferCourse` table. All the data in the column will be lost.
  - You are about to drop the column `institution` on the `TransferCourse` table. All the data in the column will be lost.
  - Added the required column `credit` to the `TransferCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptions` to the `TransferCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransferCourse" DROP COLUMN "credits",
DROP COLUMN "institution",
ADD COLUMN     "credit" TEXT NOT NULL,
ADD COLUMN     "descriptions" TEXT NOT NULL;
