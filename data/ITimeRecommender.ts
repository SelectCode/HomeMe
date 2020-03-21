export interface ITimeRecommender {
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
    //TODO: Add further settings
}

export interface Reminder {
    type: 'drinking' | 'break' | 'snack',
    inMinutes: number
}


