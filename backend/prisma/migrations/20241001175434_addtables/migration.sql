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
    "courseName" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION,
    "description" TEXT,
    "usernameId" TEXT NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "SpecialCategoryID" TEXT NOT NULL,
    "SubSpecialtyCategoryID" INTEGER NOT NULL,

    CONSTRAINT "SpecialGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,

    CONSTRAINT "SpecialCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubSpecialtyCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubSpecialtyCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialCourse" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameTH" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "SpecialGroupID" INTEGER NOT NULL,

    CONSTRAINT "SpecialCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferCourse" (
    "id" SERIAL NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseNameTH" TEXT NOT NULL,
    "courseNameENG" TEXT NOT NULL,
    "prerequisiteTH" TEXT,
    "prerequisiteENG" TEXT,
    "credit" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION,
    "descriptionTH" TEXT,
    "descriptionENG" TEXT,

    CONSTRAINT "TransferCourse_pkey" PRIMARY KEY ("id")
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
    "code" TEXT NOT NULL,
    "nameTH" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTransfer" (
    "id" SERIAL NOT NULL,
    "studentCourseId" INTEGER NOT NULL,
    "transferCourseId" INTEGER NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "dateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_cid_key" ON "Users"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_faccode_key" ON "Faculties"("faccode");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_depcode_key" ON "Departments"("depcode");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_seccode_key" ON "Departments"("seccode");

-- CreateIndex
CREATE UNIQUE INDEX "SpecialCategory_categoryID_key" ON "SpecialCategory"("categoryID");

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_faccode_fkey" FOREIGN KEY ("faccode") REFERENCES "Faculties"("faccode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialGroup" ADD CONSTRAINT "SpecialGroup_SpecialCategoryID_fkey" FOREIGN KEY ("SpecialCategoryID") REFERENCES "SpecialCategory"("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialGroup" ADD CONSTRAINT "SpecialGroup_SubSpecialtyCategoryID_fkey" FOREIGN KEY ("SubSpecialtyCategoryID") REFERENCES "SubSpecialtyCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialCourse" ADD CONSTRAINT "SpecialCourse_SpecialGroupID_fkey" FOREIGN KEY ("SpecialGroupID") REFERENCES "SpecialGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_subjectCategoryId_fkey" FOREIGN KEY ("subjectCategoryId") REFERENCES "SubjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_studentCourseId_fkey" FOREIGN KEY ("studentCourseId") REFERENCES "StudentCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTransfer" ADD CONSTRAINT "CourseTransfer_transferCourseId_fkey" FOREIGN KEY ("transferCourseId") REFERENCES "TransferCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
