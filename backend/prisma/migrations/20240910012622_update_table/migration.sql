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
    "credit" TEXT NOT NULL,
    "gpa" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "usernameId" TEXT NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_faccode_fkey" FOREIGN KEY ("faccode") REFERENCES "Faculties"("faccode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
