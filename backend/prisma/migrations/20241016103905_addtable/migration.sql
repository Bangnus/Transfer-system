-- AlterTable
ALTER TABLE "CourseTransfer" ADD COLUMN     "usernameId" TEXT;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Users"("username") ON DELETE SET NULL ON UPDATE CASCADE;
