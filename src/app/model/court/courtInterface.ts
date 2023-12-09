import { ScheduleInterface } from "./scheduleInterface";

export interface CourtInterface {
    id?: string,
    typeCourt: string,
    tax: number,
    schedule: ScheduleInterface []
}