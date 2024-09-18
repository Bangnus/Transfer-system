-- CreateTable
CREATE TABLE "TransferCourse" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "credits" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gpa" TEXT NOT NULL,
    "institution" TEXT NOT NULL,

    CONSTRAINT "TransferCourse_pkey" PRIMARY KEY ("id")
);
