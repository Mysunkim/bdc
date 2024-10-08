/*
  Warnings:

  - You are about to drop the column `event_end_date` on the `t_event` table. All the data in the column will be lost.
  - You are about to drop the column `event_start_date` on the `t_event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `t_event` DROP COLUMN `event_end_date`,
    DROP COLUMN `event_start_date`;
