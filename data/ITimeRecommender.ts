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
        let amountBreaks : number = 2;
        let breakDuration = settings.breakDuration;

        if(settings.lunchBreak){
            let lunchDuration : number = settings.lunchBreakTime;
            breakDuration -= lunchDuration;

        }
        // Has children?
        if(!settings.childrenAtHome){
            amountBreaks = Math.floor((breakDuration/5) + 1);
            let timeBetweenBreaks : number = Math.floor((settings.workingHours*60) / amountBreaks);
            pauses.push(...this.generatePauses(amountBreaks, timeBetweenBreaks));
        }

        // Generate drinking pauses
        if (settings.drinkingReminders) {

            pauses.push(...this.generateDrinkingPauses(settings.workingHours))
        }

        if(settings.snackReminders){
            pauses.push(...this.generateSnackPauses(settings.workingHours))
        }

        return pauses;
    }

    /**
     * Generate a pause every 30 minutes
     */
    generatePauses(amountBreaks : number, timeBetweenBreaks: number): Reminder[] {
        let pauses: Reminder[] = [];
        for (let i = 1; i < amountBreaks; i++) {
            pauses.push({
                type: "break",
                inMinutes: i * timeBetweenBreaks + (i-1) * 5
            })
        }
        return pauses;
    }


    /**
     * Generate a drinking pause every 30 minutes
     */
    generateDrinkingPauses(workingHours : number): Reminder[] {
        let pauses: Reminder[] = [];
        let iterations = (workingHours*60)/30;
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
    generateSnackPauses(workingHours : number): Reminder[] {
        let iterations = (workingHours*60)/30;
        let pauses: Reminder[] = [];
        for (let i = 0; i < iterations; i++) {
            pauses.push({
                type: "snack",
                inMinutes: (i + 1) * 30
            })
        }
        return pauses;
    }

}

export interface Settings {
    avatarId: string,
    childrenAtHome: boolean,
    drinkingReminders: boolean,
    //pauseReminders: boolean => Assumption: A user without kids wants take 5min pauses
    snackReminders: boolean,
    lunchBreak: boolean,
    lunchBreakTime: number, // evtl. in Date ändern
    breakDuration: number,
    workingHours: number,
    mood: string
}

export interface Reminder {
    type: 'drinking' | 'break' | 'snack',
    inMinutes: number
}


