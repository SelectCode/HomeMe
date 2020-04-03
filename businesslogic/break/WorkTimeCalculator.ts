export class WorkTimeCalculator {

    static getElapsedTime(startedWork: number) {
        let currentDate = Date.now();
        return (currentDate - startedWork) / 1000;
    }

    static elapsedMinutes(startedWork: number) {
        return Math.floor(this.getElapsedTime(startedWork) / 60)
    }

    static elapsedSeconds(startedWork: number) {
        return Math.floor(this.getElapsedTime(startedWork) % 60)
    }

    static elapsedHours(startedWork: number) {
        return Math.floor(this.getElapsedTime(startedWork) / (60 * 60))
    }
}
