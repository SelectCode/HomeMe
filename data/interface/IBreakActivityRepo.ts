import {BreakActivity} from "~/model/BreakActivity";

export interface IBreakActivityRepo {
    getBreakActivities(): Promise<BreakActivity[]>;
}

