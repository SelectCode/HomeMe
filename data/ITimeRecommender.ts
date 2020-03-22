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

        // TODO: maybe do later...
        /* For simplicity: lunch break always starts at noon
        if(settings.lunchBreak){
            let lunchDuration : number = settings.lunchBreakTime;
            breakDuration -= lunchDuration;
        }*/

        // Has children?
        if (!settings.childrenAtHome) {
            amountBreaks = Math.floor((breakDuration / 5) + 1);
            let timeBetweenBreaks: number = Math.floor((settings.workingHours * 60) / amountBreaks);
            pauses.push(...this.generatePauses(amountBreaks, timeBetweenBreaks));
        } else {
            let timeBetweenBreaks: number = Math.floor((settings.workingHours * 60) / (amountBreaks + 1));
            pauses.push(...this.generatePauses(amountBreaks + 1, timeBetweenBreaks));
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
     * Generate a pause every 30 minutes
     */
    generatePauses(amountBreaks: number, timeBetweenBreaks: number): Reminder[] {
        let pauses: Reminder[] = [];
        for (let i = 1; i < amountBreaks; i++) {
            pauses.push({
                type: "break",
                inMinutes: i * timeBetweenBreaks + (i - 1) * 5
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
                inMinutes: (i + 1) * 30
            })
        }
        return pauses;
    }

    /**
     * Generate a snack pause every 30 minutes
     */
    generateSnackPauses(workingHours: number): Reminder[] {
        let iterations: number = (workingHours * 60) / 120;
        let pauses: Reminder[] = [];
        for (let i = 0; i < iterations; i++) {
            pauses.push({
                type: "snack",
                inMinutes: (i + 1) * 120
            })
        }
        return pauses;
    }
}

export interface Settings {
    childrenAtHome: boolean,
    drinkingReminders: boolean,
    //pauseReminders: boolean => Assumption: A user without kids wants take 5min pauses
    snackReminders: boolean,
    //lunchBreak: boolean,
    //lunchBreakTime: number, // evtl. in Date ändern
    breakDuration: number,
    workingHours: number,
    mood: string // 'happy', 'neutral', 'sick', 'lazy', 'drunk', 'tired'
}

export interface Reminder {
    type: 'drinking' | 'break' | 'snack' | 'Bewegungspause' | 'Erfrischungspause' | 'Denkpause' | 'Soziale Pause' | 'Ruhepause',
    inMinutes: number
}
