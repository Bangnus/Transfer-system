/*
  Warnings:

  - You are about to drop the column `courseId` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `specialcourseId` on the `StudentCourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "courseId",
DROP COLUMN "specialcourseId";
