/*
  Warnings:

  - Added the required column `departmentID` to the `SpecialGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpecialGroup" ADD COLUMN     "departmentID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SpecialGroup" ADD CONSTRAINT "SpecialGroup_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
