import {action, createModule, mutation} from "vuex-class-component";

const VuexModule = createModule({
    namespaced: "user",
    strict: false,
    target: "nuxt",
})

export class UserStore extends VuexModule {
    name = 'Peter';
    workStart: number | undefined = undefined;
    avatar = 'butterfly';

    //state: 'preWork' | 'working' | 'chooseBreak' | 'break' | 'afterWork' = 'preWork';

    state: UiState = UiState.PREWORK;

    currentBreakId: string | undefined = undefined;

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

    @mutation
    selectBreak(breakId: string) {
        this.currentBreakId = breakId;
        this.state = UiState.BREAK;
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
}

export enum UiState {
    PREWORK,
    WORKING,
    CHOOSE_BREAK,
    BREAK,
    AFTER_WORK
}

