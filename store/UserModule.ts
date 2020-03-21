import {action, createModule, mutation} from "vuex-class-component";

const VuexModule = createModule({
    namespaced: "user",
    strict: false,
    target: "nuxt",
})

export class UserStore extends VuexModule {
    name = 'Peter';
    workStart: number | undefined = undefined;

    @mutation changeName(newName: string) {
        this.name = newName;
    }

    get isWorkingNow() {
        return this.workStart != undefined;
    }

    @action
    async workingTime(now: number) {
        if (this.workStart) {
            return now - this.workStart
        } else {
            return 0;
        }
    }


    @action
    async startWorkday() {
        this.workStart = Date.now();
    }

    @action
    async doSomethingAsync() {
        return 20
    }
}

