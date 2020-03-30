import {createModule, mutation} from "vuex-class-component";
import {event} from 'vue-analytics'
import {UiState} from "~/store/UiState";
import {vxm} from "~/store/index";
import {action} from "vuex-class-component/js";

const UserModule = createModule({
    namespaced: "state",
    strict: false,
    target: "nuxt",
});

export class UIStateStore extends UserModule {

    workStart: number | undefined = undefined;
    state: UiState = UiState.BEFORE_WORK;

    @action
    async workingTime(now: number) {
        if (this.workStart) {
            return now - this.workStart
        } else {
            return 0;
        }
    }

    @mutation
    endWorkday() {
        this.state = UiState.AFTER_WORK;
        event('flow', 'end-workday')
    }

    @mutation
    backToStart() {
        this.state = UiState.BEFORE_WORK;
        event('flow', 'back-to-start')
    }

    @mutation
    stopBreak() {
        this.workStart = Date.now();
        this.state = UiState.WORKING;
        event('flow', 'end-break')
    }

    @mutation
    selectBreak(breakId: string) {
        vxm.breaks.setNewBreak(breakId);
        this.state = UiState.BREAK;
        event('break', 'select', breakId)
    }

    @mutation
    chooseBreak() {
        this.state = UiState.CHOOSE_BREAK;
        event('flow', 'choose-break')
    }

    @mutation
    startWorkday() {
        this.workStart = Date.now();
        this.state = UiState.WORKING;
        event('flow', 'start-work-day')
    }
}

