import {action, createModule, mutation} from "vuex-class-component";
import {AvatarText, AvatarTextRepo} from "~/data/IAvatarTextRepo";
import {BreakActivity, BreakActivityRepo} from "~/data/IBreakActivityRepo";
import {Avatar, AvatarRepo} from "~/data/IAvatarRepo";
import {Settings} from "~/data/ITimeRecommender";

const VuexModule = createModule({
    namespaced: "user",
    strict: false,
    target: "nuxt",
});

export class UserStore extends VuexModule {
    name = 'Julia';
    workStart: number | undefined = undefined;
    avatar = 'butterfly';

    //state: 'preWork' | 'working' | 'chooseBreak' | 'break' | 'afterWork' = 'preWork';

    state: UiState = UiState.BEFORE_WORK;

    currentBreakId: string | undefined = undefined;

    breakStarted: number | undefined = undefined;

    @mutation changeState(state: UiState) {
        this.state = state;
    }

    @mutation changeName(newName: string) {
        this.name = newName;
    }

    get isWorkingNow() {
        return this.workStart != undefined;
    }

    @mutation
    endWorkday() {
        this.state = UiState.AFTER_WORK;
    }

    @mutation
    backToStart() {
        this.state = UiState.BEFORE_WORK;
    }

    @action
    async workingTime(now: number) {
        if (this.workStart) {
            return now - this.workStart
        } else {
            return 0;
        }
    }

    @mutation
    stopBreak() {
        this.state = UiState.WORKING;
    }

    // Settings for Break Recommendation
    settings: Settings = {
        breakDuration: 5,
        childrenAtHome: false,
        drinkingReminders: true,
        mood: "happy",
        snackReminders: true,
        workingHours: 8
    };

    @mutation setSettings(settings: Settings) {
        this.settings = settings;
    }

    @mutation
    selectBreak(breakId: string) {
        this.currentBreakId = breakId;
        this.state = UiState.BREAK;
        this.breakStarted = Date.now();
    }

    @mutation
    setAvatar(avatarId: string) {
        this.avatar = avatarId;
    }


    @mutation
    chooseBreak() {
        this.state = UiState.CHOOSE_BREAK;
    }

    @mutation
    startWorkday() {
        this.workStart = Date.now();
        this.state = UiState.WORKING
    }

    @action
    async startPauseSelection() {
        this.state = UiState.CHOOSE_BREAK;
    }

    @action
    async doSomethingAsync() {
        return 20
    }

    avatarTexts: AvatarText[] = [];

    get currentBreakActivity() {
        if (this.currentBreakId) {
            return this.breakActivities.find(it => it.name)
        } else {
            return {}
        }
    }

    @action
    async loadData() {
        await this.loadAvatars();
        await this.loadBreakActivities();
        await this.loadAvatarTexts();
    }

    @action
    private async loadAvatarTexts() {
        let texts = await new AvatarTextRepo().getAvatarTexts();
        this.setAvatarTexts(texts);
        console.log("loaded avatar texts " + this.avatarTexts.length);
    }

    @mutation
    private setAvatars(avatars: Avatar[]) {
        this.avatars = avatars;
    }

    @mutation
    private setAvatarTexts(texts: AvatarText[]) {
        this.avatarTexts = texts;
    }

    @mutation
    private setBreakActivities(activities: BreakActivity[]) {
        this.breakActivities = activities;
    }


    breakActivities: BreakActivity[] = [];

    @action
    private async loadBreakActivities() {
        let activities = await new BreakActivityRepo().getBreakActivities();
        this.setBreakActivities(activities);
        console.log("loaded break activities: " + this.breakActivities.length);
    }

    avatars: Avatar[] = [];

    @action
    private async loadAvatars() {
        let avatars = await new AvatarRepo().getAvatars();
        this.setAvatars(avatars);
        console.log("loaded avatars : " + this.avatars.length);
    }

    @mutation
    reset() {
        //TODO
    }


}

export enum UiState {
    BEFORE_WORK,
    WORKING,
    BREAK_NEEDED,
    CHOOSE_BREAK,
    BREAK,
    AFTER_WORK
}

