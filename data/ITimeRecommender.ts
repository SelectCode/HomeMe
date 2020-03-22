export interface ITimeRecommender {
    /**
     * This method is called when the user starts to work (also after a break)
     * @param settings
     */
    getRecommendedTimesForSettings(settings: Settings): Reminder[]
}

export class ITimeRecommenderImpl implements ITimeRecommender {
    getRecommendedTimesForSettings(settings: Settings): Reminder[] {
        return [];
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


