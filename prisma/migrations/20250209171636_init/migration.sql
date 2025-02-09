-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "dueTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
