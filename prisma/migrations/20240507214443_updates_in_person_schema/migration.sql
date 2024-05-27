/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `person` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "observations" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "person_cpf_key" ON "person"("cpf");
