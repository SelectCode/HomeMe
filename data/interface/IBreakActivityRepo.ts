import {BreakActivity} from "~/model/BreakActivity";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

export interface IBreakActivityRepo {
    getBreakActivities(axios: NuxtAxiosInstance): Promise<BreakActivity[]>;
}

