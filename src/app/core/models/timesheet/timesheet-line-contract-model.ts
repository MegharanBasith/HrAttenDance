import { TimesheetLineModel } from "./timesheet-line-model";

export interface TimesheetLineContractModel{
    ProjId : string;
    TimesheetPeriod : string;
    TimesheetLinesList : TimesheetLineModel[];
}