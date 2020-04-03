export class TimeUtils {

    private static readonly SECONDS_IN_HOUR = 3600;
    private static readonly MILLIS_IN_SECOND = 1000;

    /**
     * Calculates the elapsed seconds since a timestamp
     * @param start timestamp in Milliseconds
     */
    static getElapsedSecondsSince(start: number) {
        let currentDate = Date.now();
        return (currentDate - start) / TimeUtils.MILLIS_IN_SECOND;
    }

    /**
     * Calculates the remaining seconds until a timestamp
     * @param end end timestamp in milliseconds
     */
    static getRemainingSecondsUntil(end: number) {
        const currentDate = Date.now();
        return (end - currentDate) / TimeUtils.MILLIS_IN_SECOND;
    }

    /**
     * Converts elapsed time to an object containing elapsed hours, minutes and seconds
     * @param duration duration in seconds
     */
    static getTimeComponents(duration: number): Duration {
        let hours = Math.floor(duration / TimeUtils.SECONDS_IN_HOUR);
        let minutes = Math.floor((duration - (hours * TimeUtils.SECONDS_IN_HOUR)) / 60);
        let seconds = Math.floor(duration - (hours * TimeUtils.SECONDS_IN_HOUR) - (minutes * 60));

        return {
            seconds: seconds,
            minutes: minutes,
            hours: hours
        }
    }
}

export type Duration = { seconds: number; hours: number; minutes: number }
