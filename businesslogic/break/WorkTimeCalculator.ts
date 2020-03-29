export class WorkTimeCalculator {

    static getRemainingTime(startedWork: number) {
        let currentDate = Date.now();
        return (currentDate - startedWork) / 1000;
    }

    static remainingMinutes(startedWork: number) {
        return Math.floor(this.getRemainingTime(startedWork) / 60)
    }

    static remainingSeconds(startedWork: number) {
        return Math.floor(this.getRemainingTime(startedWork) % 60)
    }
}
