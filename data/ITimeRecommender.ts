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

        // Generate drinking pauses
        if (settings.drinkingReminders) {
            pauses.push(...this.generateDrinkingPauses())
        }



        return pauses;


    }

    /**
     * Generate a drinking pause every 30 minutes
     */
    generateDrinkingPauses(): Reminder[] {
        let pauses: Reminder[] = [];
        for (let i = 0; i < 10; i++) {
            pauses.push({
                type: "drinking",
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
    pauseReminders: boolean
    snackReminders: boolean,
    lunchBreak: boolean
}

export interface Reminder {
    type: 'drinking' | 'break' | 'snack',
    inMinutes: number
}


