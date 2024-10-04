/*
  Warnings:

  - You are about to drop the column `code` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `nameTH` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `studentCourseId` on the `CourseTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `transferCourseId` on the `CourseTransfer` table. All the data in the column will be lost.
  - The `status` column on the `CourseTransfer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `SpecialGroupID` on the `SpecialCourse` table. All the data in the column will be lost.
  - You are about to drop the column `SpecialCategoryID` on the `SpecialGroup` table. All the data in the column will be lost.
  - You are about to drop the column `SubSpecialtyCategoryID` on the `SpecialGroup` table. All the data in the column will be lost.
  - You are about to drop the `SpecialCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubSpecialtyCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransferCourse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseCode` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseNameENG` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseNameTH` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalCourseId` to the `CourseTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferredCourseId` to the `CourseTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SubjectCategoryID` to the `SpecialGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "CourseTransfer" DROP CONSTRAINT "CourseTransfer_studentCourseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTransfer" DROP CONSTRAINT "CourseTransfer_transferCourseId_fkey";

-- DropForeignKey
ALTER TABLE "SpecialCourse" DROP CONSTRAINT "SpecialCourse_SpecialGroupID_fkey";

-- DropForeignKey
ALTER TABLE "SpecialGroup" DROP CONSTRAINT "SpecialGroup_SpecialCategoryID_fkey";

-- DropForeignKey
ALTER TABLE "SpecialGroup" DROP CONSTRAINT "SpecialGroup_SubSpecialtyCategoryID_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "code",
DROP COLUMN "nameTH",
ADD COLUMN     "courseCode" TEXT NOT NULL,
ADD COLUMN     "courseNameENG" TEXT NOT NULL,
ADD COLUMN     "courseNameTH" TEXT NOT NULL,
ADD COLUMN     "descriptionENG" TEXT,
ADD COLUMN     "descriptionTH" TEXT,
ADD COLUMN     "gpa" DOUBLE PRECISION,
ADD COLUMN     "prerequisiteENG" TEXT,
ADD COLUMN     "prerequisiteTH" TEXT;

-- AlterTable
ALTER TABLE "CourseTransfer" DROP COLUMN "studentCourseId",
DROP COLUMN "transferCourseId",
ADD COLUMN     "originalCourseId" INTEGER NOT NULL,
ADD COLUMN     "transferredCourseId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TransferStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "SpecialCourse" DROP COLUMN "SpecialGroupID",
ADD COLUMN     "SubSpecialtyGroupID" INTEGER;

-- AlterTable
ALTER TABLE "SpecialGroup" DROP COLUMN "SpecialCategoryID",
DROP COLUMN "SubSpecialtyCategoryID",
ADD COLUMN     "SubjectCategoryID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SpecialCategory";

-- DropTable
DROP TABLE "SubSpecialtyCategory";

-- DropTable
DROP TABLE "TransferCourse";

-- CreateTable
CREATE TABLE "SubSpecialtyGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "SpecialGroupID" INTEGER,

    CONSTRAINT "SubSpecialtyGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialGroup" ADD CONSTRAINT "SpecialGroup_SubjectCategoryID_fkey" FOREIGN KEY ("SubjectCategoryID") REFERENCES "SubjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSpecialtyGroup" ADD CONSTRAINT "SubSpecialtyGroup_SpecialGroupID_fkey" FOREIGN KEY ("SpecialGroupID") REFERENCES "SpecialGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialCourse" ADD CONSTRAINT "SpecialCourse_SubSpecialtyGroupID_fkey" FOREIGN KEY ("SubSpecialtyGroupID") REFERENCES "SubSpecialtyGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_originalCourseId_fkey" FOREIGN KEY ("originalCourseId") REFERENCES "StudentCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_transferredCourseId_fkey" FOREIGN KEY ("transferredCourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
