export interface ITimeRecommender {
    /**
     * This method is called when the user starts to work (also after a break)
     * @param settings
     */
    getRecommendedTimesForSettings(settings: Settings): Reminder[]
}

export class ITimeRecommenderImpl implements ITimeRecommender {

    getRecommendedTimesForSettings(settings: Settings): Reminder[] {

        let pauses: Reminder[] = [];
        let amountBreaks: number = 2;
        let breakDuration = settings.breakDuration;
        let now = new Date();
        let lunchFlag: boolean = false;
        let pausenZeit: number = 0;


        // For simplicity: lunch break always starts at noon
        if (settings.lunchBreak) {
            if (now.getHours() > 14) {
                alert("ACHTUNG:\n Eine Lunchbreak ist nur möglich, wenn der Arbeitstag vor 14 Uhr beginnt.");
            } else {
                let lunchDuration: number = settings.lunchBreakTime;

                if (lunchDuration <= breakDuration) {
                    breakDuration -= lunchDuration;

                    // Get current time and schedule a lunch break between 12 - 14 o'clock
                    pausenZeit = (now.getHours() + 3) * 60 + now.getMinutes();

                    // check if break time is in the interval [12,14], if not adjust it manually
                    if (pausenZeit > (14 * 60))
                        pausenZeit = 14 * 60;
                    else if (pausenZeit < (12 * 60))
                        pausenZeit = 12 * 60;

                    let totalMinutesPassedToday: number = now.getHours() * 60 + now.getMinutes();
                    pauses.push({
                        type: "lunch",
                        inMinutes: pausenZeit - totalMinutesPassedToday,
                        duration: settings.lunchBreakTime
                    });
                    lunchFlag = true;
                } else
                    alert("ACHTUNG:\n Lunch Pausenzeit zu lang!");
            }
        }

        if (breakDuration > 5) {
            // Check if user has children @ Home
            if (!settings.childrenAtHome) {
                if (lunchFlag) {
                    this.calculateNoChildrenBreak(pausenZeit, now, settings, breakDuration, pauses);
                } else {
                    amountBreaks = Math.floor((breakDuration / 5) + 1);
                    let timeBetweenBreaks: number = Math.floor((settings.workingHours * 60) / amountBreaks);
                    pauses.push(...this.generatePauses(amountBreaks, timeBetweenBreaks));
                }
            } else {
                if (lunchFlag) {
                    // hasChildren + LunchFlag
                    this.calculateLunchBreak(pausenZeit, now, settings, breakDuration, pauses, true);
                } else {
                    // hasChildren + !LunchFlag
                    let timeBetweenBreaks: number = Math.floor((settings.workingHours * 60) / (amountBreaks + 1));
                    pauses.push(...this.generatePauses(amountBreaks + 1, timeBetweenBreaks));
                }
            }
        }

        // Generate drinking pauses
        if (settings.drinkingReminders) {
            pauses.push(...this.generateDrinkingPauses(settings.workingHours))
        }

        if (settings.snackReminders) {
            pauses.push(...this.generateSnackPauses(settings.workingHours))
        }

        // Possible moods: 'happy', 'neutral', 'sick', 'lazy', 'drunk', 'tired'
        switch (settings.mood) {
            case 'happy' : {
                pauses[0].type = 'Bewegungspause';
                break;
            }
            case 'neutral' : {
                // TODO: get more creative
                pauses[0].type = 'Denkpause';
                break;
            }
            case 'sick' : {
                pauses[0].type = 'Ruhepause';
                for (let i = 0; i < pauses.length; i++) {
                    if (pauses[i].type === "break")
                        pauses[i].type = "Ruhepause";
                }
                break;
            }
            case 'lazy' : {
                pauses[0].type = 'Soziale Pause';
                break;
            }
            case 'drunk' : {
                pauses[0].type = 'Ruhepause';
                for (let i = 1; i < pauses.length; i++) {
                    if (pauses[i].type === "break") {
                        pauses[i].type = "Bewegungspause";
                        break;
                    }
                }
                break;
            }
            case 'tired' : {
                pauses[0].type = 'Bewegungspause';
                for (let i = 1; i < pauses.length; i++) {
                    if (pauses[i].type === "break") {
                        pauses[i].type = "Bewegungspause";
                        break;
                    }
                }
                break;
            }
        }
        return pauses;

    }


    /**
     * Check if interval size if big enough for a break
     */
    checkIntervalSize(interval_1: number, interval_2: number, minTime: number) {
        if (interval_1 > minTime)
            interval_1 -= 60;
        if (interval_2 > minTime)
            interval_2 -= 60;
    }

    /**
     * Evenly spreads the break time among a time interval
     */
    calculateIntervalBreak(pausenZeit: number, time_interval: number, pauses: Reminder[]): void {
        let interval_2_amountOfBreaks: number = Math.floor(pausenZeit / 5);
        let interval_2_Break_Reminder: number = pausenZeit - (interval_2_amountOfBreaks * 5);

        if (interval_2_Break_Reminder !== 0)
            interval_2_amountOfBreaks += 1;

        // calculate inMinutes for each break
        let amountBreaks_2: number = pausenZeit / 5;
        let timeBetweenBreaks_2: number = Math.floor((time_interval - pausenZeit) / amountBreaks_2);
        pauses.push(...this.generatePauses(interval_2_amountOfBreaks + 1, timeBetweenBreaks_2));
    }


    /**
     * Generate a pause every 30 minutes
     */
    generatePauses(amountBreaks: number, timeBetweenBreaks: number): Reminder[] {
        let pauses: Reminder[] = [];
        for (let i = 1; i < amountBreaks; i++) {
            pauses.push({
                type: "break",
                inMinutes: i * timeBetweenBreaks + (i - 1) * 5,
                duration: 5
            })
        }
        return pauses;
    }


    /**
     * Generate a drinking pause every 30 minutes
     */
    generateDrinkingPauses(workingHours: number): Reminder[] {
        let pauses: Reminder[] = [];
        let iterations: number = (workingHours * 60) / 30;
        for (let i = 0; i < iterations; i++) {
            pauses.push({
                type: "drinking",
                inMinutes: (i + 1) * 30,
                duration: 0
            })
        }
        return pauses;
    }

    /**
     * Generate a snack pause every 30 minutes.
     */
    generateSnackPauses(workingHours: number): Reminder[] {
        let iterations: number = (workingHours * 60) / 120;
        let pauses: Reminder[] = [];
        for (let i = 0; i < iterations; i++) {
            pauses.push({
                type: "snack",
                inMinutes: (i + 1) * 120,
                duration: 0
            })
        }
        return pauses;
    }


    /**
     * Calculate the lunch break
     */

    calculateLunchBreak(pausenZeit: number, now: Date, settings: Settings, breakDuration: number, pauses: Reminder[], childrenFlag: boolean) {
        if (childrenFlag) {
            let interval_1: number = pausenZeit - (now.getHours() * 60 + now.getMinutes());
            let interval_2: number = (now.getHours() * 60 + now.getMinutes() + settings.workingHours) - (pausenZeit + settings.lunchBreakTime);

            let ratio_1 = (interval_1 / (interval_1 + interval_2));
            //let ratio_2 = (interval_2 / (interval_1 + interval_2));

            let pausenZeit_1: number = ratio_1 * breakDuration;
            let pausenZeit_2: number = breakDuration - pausenZeit_1;

            let inMinutes_1: number = (interval_1 / 2) - (pausenZeit_1 / 2);
            let inMinutes_2: number = (interval_2 / 2) - (pausenZeit_2 / 2);
            inMinutes_2 += interval_1;
            inMinutes_2 += settings.lunchBreakTime;

            pauses.push({
                type: "break",
                inMinutes: inMinutes_1,
                duration: pausenZeit_1
            });

            pauses.push({
                type: "break",
                inMinutes: inMinutes_2,
                duration: pausenZeit_2
            });

        }
    }

    /**
     * Calculates two big breaks if childrenFlag is true
     */
    calculateNoChildrenBreak(pausenZeit: number, now: Date, settings: Settings, breakDuration: number, pauses: Reminder[]) {
        // No kids but lunchbreak = true
        let interval_1_flag: boolean = false;
        let interval_2_flag: boolean = false;

        let interval_1: number = pausenZeit - (now.getHours() * 60 + now.getMinutes());
        let interval_2: number = (now.getHours() * 60 + now.getMinutes() + settings.workingHours) - (pausenZeit + settings.lunchBreakTime);

        // since we have a long lunch break, we don't want to take a break 1 hour before and 1 hour after the break
        this.checkIntervalSize(interval_1, interval_2, 120);

        // calculate ratio for each interval
        let ratio_1 = (interval_1 / (interval_1 + interval_2));
        let ratio_2 = (interval_2 / (interval_1 + interval_2));

        // calculate ratio of break time for each interval
        let pausenZeit_1: number = ratio_1 * breakDuration;
        let pausenZeit_2: number = breakDuration - pausenZeit_1;

        // EDGE CASE: if pausenZeit_x < 15 => then make 1 big break, else spread the time evenly
        if (pausenZeit_1 < 15) {
            let inMinutes_1: number = (interval_1 / 2) - (pausenZeit_1 / 2);

            pauses.push({
                type: "break",
                inMinutes: inMinutes_1,
                duration: pausenZeit_1
            });
            interval_1_flag = true;
        }

        if (pausenZeit_2 < 15) {
            let inMinutes_2: number = (interval_2 / 2) - (pausenZeit_2 / 2);
            inMinutes_2 += interval_1;
            inMinutes_2 += settings.lunchBreakTime;

            pauses.push({
                type: "break",
                inMinutes: inMinutes_2,
                duration: pausenZeit_2
            });
            interval_2_flag = true;
        }

        // calculate # of breaks for each interval (5min breaks each)
        if (!interval_1_flag)
            this.calculateIntervalBreak(pausenZeit_1, interval_1, pauses);
        if (!interval_2_flag)
            this.calculateIntervalBreak(pausenZeit_2, interval_2, pauses);
    }
}

export interface Settings {
    //avatarId: string,
    childrenAtHome: boolean,
    drinkingReminders: boolean,
    snackReminders: boolean,
    lunchBreak: boolean,
    lunchBreakTime: number, // Wenn 0 dann keine Lunchbreak
    breakDuration: number,
    workingHours: number,
    mood: string // 'happy', 'neutral', 'sick', 'lazy', 'drunk', 'tired'
}

export interface Reminder {
    type: 'drinking' | 'break' | 'snack' | 'Bewegungspause' | 'Erfrischungspause' | 'Denkpause' | 'Soziale Pause' | 'Ruhepause' | 'lunch',
    inMinutes: number,
    duration: number
}