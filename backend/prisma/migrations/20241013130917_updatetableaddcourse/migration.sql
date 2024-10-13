-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Users"("username") ON DELETE SET NULL ON UPDATE CASCADE;
