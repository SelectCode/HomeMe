import {vxm} from "~/store";

export class WorkTimeCalculator {

    static getRemainingTime() {
        let startedWork = vxm.user.workStart as number;
        let currentDate = Date.now();
        return (currentDate - startedWork) / 1000;
    }

    static remainingMinutes() {
        return Math.floor(this.getRemainingTime() / 60)
    }

    static remainingSeconds() {
        return Math.floor(this.getRemainingTime() % 60)
    }
}