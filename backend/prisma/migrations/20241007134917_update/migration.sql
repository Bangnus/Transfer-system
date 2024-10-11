-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "cid" TEXT,
    "username" TEXT,
    "name" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "type" TEXT,
    "faccode" TEXT,
    "facname" TEXT,
    "depcode" TEXT,
    "depname" TEXT,
    "seccode" TEXT,
    "secname" TEXT,
    "email" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculties" (
    "id" SERIAL NOT NULL,
    "faccode" TEXT NOT NULL,
    "facname" TEXT NOT NULL,

    CONSTRAINT "Faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" SERIAL NOT NULL,
    "depcode" TEXT NOT NULL,
    "depname" TEXT NOT NULL,
    "seccode" TEXT NOT NULL,
    "secname" TEXT NOT NULL,
    "faccode" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseNameTH" TEXT NOT NULL,
    "courseNameENG" TEXT NOT NULL,
    "prerequisiteTH" TEXT,
    "prerequisiteENG" TEXT,
    "credit" INTEGER NOT NULL,
    "descriptionTH" TEXT,
    "descriptionENG" TEXT,
    "usernameId" TEXT NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "SubjectCategoryID" INTEGER NOT NULL,
    "secname" TEXT NOT NULL,

    CONSTRAINT "SpecialGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubSpecialtyGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "SpecialGroupID" INTEGER,

    CONSTRAINT "SubSpecialtyGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialCourse" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseNameTH" TEXT NOT NULL,
    "courseNameENG" TEXT NOT NULL,
    "prerequisiteTH" TEXT,
    "prerequisiteENG" TEXT,
    "credit" INTEGER NOT NULL,
    "descriptionTH" TEXT,
    "descriptionENG" TEXT,
    "SubSpecialtyGroupID" INTEGER,

    CONSTRAINT "SpecialCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subjectCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseNameTH" TEXT NOT NULL,
    "courseNameENG" TEXT NOT NULL,
    "prerequisiteTH" TEXT,
    "prerequisiteENG" TEXT,
    "credit" INTEGER NOT NULL,
    "descriptionTH" TEXT,
    "descriptionENG" TEXT,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTransfer" (
    "id" SERIAL NOT NULL,
    "originalCourseId" INTEGER NOT NULL,
    "transferredCourseId" INTEGER NOT NULL,
    "description" TEXT,
    "status" "TransferStatus" NOT NULL DEFAULT 'PENDING',
    "dateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_cid_key" ON "Users"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_depname_key" ON "Users"("depname");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_faccode_key" ON "Faculties"("faccode");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_depcode_key" ON "Departments"("depcode");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_seccode_key" ON "Departments"("seccode");

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_faccode_fkey" FOREIGN KEY ("faccode") REFERENCES "Faculties"("faccode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialGroup" ADD CONSTRAINT "SpecialGroup_SubjectCategoryID_fkey" FOREIGN KEY ("SubjectCategoryID") REFERENCES "SubjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSpecialtyGroup" ADD CONSTRAINT "SubSpecialtyGroup_SpecialGroupID_fkey" FOREIGN KEY ("SpecialGroupID") REFERENCES "SpecialGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialCourse" ADD CONSTRAINT "SpecialCourse_SubSpecialtyGroupID_fkey" FOREIGN KEY ("SubSpecialtyGroupID") REFERENCES "SubSpecialtyGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_subjectCategoryId_fkey" FOREIGN KEY ("subjectCategoryId") REFERENCES "SubjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_originalCourseId_fkey" FOREIGN KEY ("originalCourseId") REFERENCES "StudentCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_transferredCourseId_fkey" FOREIGN KEY ("transferredCourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
