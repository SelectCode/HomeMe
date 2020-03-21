export interface ITimeRecommender {
    getRecommendedTimesForSettings(settings : Settings) : Date[]
}

export class ITimeRecommenderImpl implements ITimeRecommender {
    getRecommendedTimesForSettings(settings: Settings): Date[] {
        return [new Date()];
    }
}

export interface Settings {
    avatarId: string,
    childrenAtHome: boolean,
    //TODO: Add further settings
}


