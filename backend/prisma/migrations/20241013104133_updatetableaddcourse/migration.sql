-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_originalCourseId_fkey" FOREIGN KEY ("originalCourseId") REFERENCES "StudentCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_transferredCourseId_fkey" FOREIGN KEY ("transferredCourseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_specialtransferredCourseId_fkey" FOREIGN KEY ("specialtransferredCourseId") REFERENCES "SpecialCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
