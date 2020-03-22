/* ------- Default Profile Settings ---- */
const DEFAULT = 2;
const WORKING_HOURS = 8;
const MODEL = 'pomodoro';
const



/* ------------------------------------- */

export interface ITimeRecommender {
    getRecommendedTimesForSettings(settings: Settings): Reminder[]
}

export class ITimeRecommenderImpl implements ITimeRecommender {
    getRecommendedTimesForSettings(settings: Settings): Reminder[] {
        var timeArray: Reminder[] = [];

        var amountBreaks = DEFAULT;

        if(settings.breakModel === 'pomodoro')
            amountBreaks = Math.floor((settings.workingHours*60) / 80);
        else if(settings.breakModel === '90:20')
            amountBreaks = Math.floor((settings.workingHours*60) / 80);
        else if(settings.breakModel === '2x15')
            amountBreaks = Math.floor((settings.workingHours*60) / 80);
        else // individual
            amountBreaks = Math.floor((settings.workingHours*60) / 80);



        return [];
    }
}

export interface Settings {
    avatarId: string,
    childrenAtHome: boolean,
    drinkingReminders: boolean,
    pauseReminders: boolean
    snackReminders: boolean,
    lunchBreak: boolean,
    workingHours: number,
    breakModel: string // input: pomodoro, 90:20, 2x15, individual
    totalBreakDuration: number // in minutes
    //TODO: Add further settings
}

export interface Reminder {
    type: 'drinking' | 'break' | 'snack',
    inMinutes: number
}


