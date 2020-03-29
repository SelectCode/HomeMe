import {action, createModule, mutation} from "vuex-class-component";
import {BreakActivity} from "~/model/BreakActivity";
import {AirtableBreakActivityRepo} from "~/data/airtable/AirtableBreakActivityRepo";

const BreakModule = createModule({
    namespaced: "break",
    strict: false,
    target: "nuxt",
});

declare var $nuxt: any;

/**
 * Saves possible breaks and the currently selected one
 */
export class BreakStore extends BreakModule {
    currentBreakId: string | undefined = undefined;
    breakStarted: number | undefined = undefined;
    breakActivities: BreakActivity[] = [];
    breakType: "drinking" | "break" | "snack" | "Bewegungspause" | "Erfrischungspause" | "Denkpause" | "Soziale Pause" | "Ruhepause" = 'break';

    get currentBreakActivity() {
        if (this.currentBreakId) {
            return this.breakActivities.find(it => it.name == this.currentBreakId)
        } else {
            return undefined
        }
    }

    @action
    async loadData() {
        await this.loadBreakActivities();
    }


    @mutation
    private setBreakActivities(activities: BreakActivity[]) {
        this.breakActivities = activities;
    }

    @mutation
    setNewBreak(breakId: string) {
        this.breakStarted = Date.now();
        this.currentBreakId = breakId;
    }

    @action
    private async loadBreakActivities() {
        let activities = await new AirtableBreakActivityRepo().getBreakActivities($nuxt.$axios);
        this.setBreakActivities(activities);
        console.log("loaded break activities: " + this.breakActivities.length);
    }

    @mutation
    setBreakType(breakType: "drinking" | "break" | "snack" | "Bewegungspause" | "Erfrischungspause" | "Denkpause" | "Soziale Pause" | "Ruhepause") {
        this.breakType = breakType;
    }
}
