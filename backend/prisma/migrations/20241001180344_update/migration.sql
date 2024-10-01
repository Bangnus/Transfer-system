/*
  Warnings:

  - A unique constraint covering the columns `[SubSpecialtyCategoryID]` on the table `SubSpecialtyCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `SubSpecialtyCategoryID` to the `SubSpecialtyCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SpecialGroup" DROP CONSTRAINT "SpecialGroup_SubSpecialtyCategoryID_fkey";

-- AlterTable
ALTER TABLE "SpecialGroup" ALTER COLUMN "SubSpecialtyCategoryID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubSpecialtyCategory" ADD COLUMN     "SubSpecialtyCategoryID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubSpecialtyCategory_SubSpecialtyCategoryID_key" ON "SubSpecialtyCategory"("SubSpecialtyCategoryID");

-- AddForeignKey
ALTER TABLE "SpecialGroup" ADD CONSTRAINT "SpecialGroup_SubSpecialtyCategoryID_fkey" FOREIGN KEY ("SubSpecialtyCategoryID") REFERENCES "SubSpecialtyCategory"("SubSpecialtyCategoryID") ON DELETE SET NULL ON UPDATE CASCADE;
