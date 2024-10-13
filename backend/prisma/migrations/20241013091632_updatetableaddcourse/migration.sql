-- DropForeignKey
ALTER TABLE "CourseTransfer" DROP CONSTRAINT "CourseTransfer_originalCourseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTransfer" DROP CONSTRAINT "CourseTransfer_specialtransferredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTransfer" DROP CONSTRAINT "CourseTransfer_transferredCourseId_fkey";

-- AlterTable
ALTER TABLE "CourseTransfer" ALTER COLUMN "originalCourseId" DROP NOT NULL,
ALTER COLUMN "transferredCourseId" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "specialtransferredCourseId" DROP NOT NULL;
