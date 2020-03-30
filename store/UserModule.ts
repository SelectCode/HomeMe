import {createModule, mutation} from "vuex-class-component";
import {Settings} from "~/businesslogic/avatar/text/ITimeRecommender";
import {event} from 'vue-analytics'

const UserModule = createModule({
    namespaced: "user",
    strict: false,
    target: "nuxt",
});

export class UserStore extends UserModule {
    name = '';

    @mutation changeName(newName: string) {
        this.name = newName;
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

    @mutation setMood(mood: string) {
        this.settings.mood = mood;
        event('mood', 'change', mood)
    }

}

