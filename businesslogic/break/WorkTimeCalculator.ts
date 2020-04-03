export class WorkTimeCalculator {

    static readonly SECONDS_IN_HOUR = 3600;

    static getElapsedSecondsTotal(startedWork: number) {
        let currentDate = Date.now();
        return (currentDate - startedWork) / 1000;
    }

    /**
     * Converts elapsed time to an object containing elapsed hours, minutes and seconds
     * @param workStart
     */
    static getElapsedTimeComponents(workStart: number): { seconds: number; hours: number; minutes: number } {
        const elapsedSeconds = this.getElapsedSecondsTotal(workStart);
        let hours = Math.floor(elapsedSeconds / WorkTimeCalculator.SECONDS_IN_HOUR);
        let minutes = Math.floor((elapsedSeconds - (hours * WorkTimeCalculator.SECONDS_IN_HOUR)) / 60);
        let seconds = Math.floor(elapsedSeconds - (hours * 3600) - (minutes * 60));

        return {
            seconds: seconds,
            minutes: minutes,
            hours: hours
        }
    }
}
