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
        //let usedBreakDuration : number = breakDuration;
        let now = new Date();
        let lunchFlag: boolean = false;
        let pausenZeit: number = 0;


        //For simplicity: lunch break always starts at noon
        if (settings.lunchBreak) {
            if (now.getHours() > 14) {
                //Keine Lunchbreak mehr möglich
                alert("ACHTUNG:\n Eine Lunchbreak ist nur möglich, wenn der Arbeitstag vor 14 Uhr beginnt.");
            } else {
                let lunchDuration: number = settings.lunchBreakTime;

                if (lunchDuration <= breakDuration) {
                    breakDuration -= lunchDuration;

                    // Get current time and schedule a lunch break between 12 - 14 o'clock
                    pausenZeit = (now.getHours() + 3) * 60 + now.getMinutes();
                    if (pausenZeit > (14 * 60))
                        pausenZeit = 14 * 60;
                    else if (pausenZeit < (12 * 60))
                        pausenZeit = 12 * 60;

                    let totalMinutesPassedToday: number = now.getHours() * 60 + now.getMinutes();
                    pauses.push({
                        type: "lunch",
                        inMinutes: pausenZeit - totalMinutesPassedToday,
                        duration: settings.lunchBreakTime
                    })
                    lunchFlag = true;
                } else
                    alert("ACHTUNG:\n Lunch Pausenzeit zu lang!");
            }
        }


        if (breakDuration > 5) {
            // Has children?
            if (!settings.childrenAtHome) {
                if(lunchFlag){
                    // Keine Kinder aber lunch Flag gesetzt
                    let interval_1 : number = pausenZeit - (now.getHours()*60 + now.getMinutes());
                    let interval_2 : number = (now.getHours()*60 + now.getMinutes() + settings.workingHours) - (pausenZeit + settings.lunchBreakTime);


                } else {
                    amountBreaks = Math.floor((breakDuration / 5) + 1);
                    let timeBetweenBreaks: number = Math.floor((settings.workingHours * 60) / amountBreaks);
                    pauses.push(...this.generatePauses(amountBreaks, timeBetweenBreaks));
                }
            } else {
                if(lunchFlag){
                    // TODO: hasChildren + LunchFlag
                    let interval_1 : number = pausenZeit - (now.getHours()*60 + now.getMinutes());
                    let interval_2 : number = (now.getHours()*60 + now.getMinutes() + settings.workingHours) - (pausenZeit + settings.lunchBreakTime);

                    let ratio_1  = (interval_1 / (interval_1 + interval_2));
                    let ratio_2  = (interval_2 / (interval_1 + interval_2));

                    let pausenZeit_1 : number = ratio_1 * breakDuration;
                    let pausenZeit_2 : number = breakDuration - pausenZeit_1;

                    let inMinutes_1 : number = (interval_1/2) - (pausenZeit_1/2);
                    let inMinutes_2 : number = (interval_2/2) - (pausenZeit_2/2);
                    inMinutes_2 += interval_1;
                    inMinutes_2 += settings.lunchBreakTime;

                    // TODO: Add break duration to array
                    pauses.push({
                        type: "break",
                        inMinutes: inMinutes_1,
                        duration: pausenZeit_1
                    })

                    pauses.push({
                        type: "break",
                        inMinutes: inMinutes_2,
                        duration: pausenZeit_2
                    })



                } else {
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