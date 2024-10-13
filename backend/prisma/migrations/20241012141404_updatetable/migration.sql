/*
  Warnings:

  - You are about to drop the column `courseNameENG` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `courseNameTH` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionENG` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionTH` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `prerequisiteENG` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `prerequisiteTH` on the `StudentCourse` table. All the data in the column will be lost.
  - Added the required column `specialtransferredCourseId` to the `CourseTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseName` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseTransfer" ADD COLUMN     "specialtransferredCourseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "courseNameENG",
DROP COLUMN "courseNameTH",
DROP COLUMN "descriptionENG",
DROP COLUMN "descriptionTH",
DROP COLUMN "prerequisiteENG",
DROP COLUMN "prerequisiteTH",
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "grade" TEXT,
ALTER COLUMN "credit" DROP NOT NULL,
ALTER COLUMN "credit" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_specialtransferredCourseId_fkey" FOREIGN KEY ("specialtransferredCourseId") REFERENCES "SpecialCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
