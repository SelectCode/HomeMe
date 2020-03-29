import {Store} from 'vuex'
import {createProxy, extractVuexModule} from "vuex-class-component/js";
import {UserStore} from "~/store/UserModule";
import {BreakStore} from "~/store/BreakStore";
import {AvatarStore} from "~/store/AvatarModule";
import {UIStateStore} from "~/store/UIStateStore";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});


export const store = new Store({
    modules: {
        ...extractVuexModule(UserStore),
        ...extractVuexModule(BreakStore),
        ...extractVuexModule(AvatarStore),
        ...extractVuexModule(UIStateStore)
    },
    plugins: [vuexLocal.plugin],
    actions: {
        async init(){
            await this.dispatch('break/loadData');
            await this.dispatch('avatar/loadData');
        }
    }

});


// Creating proxies.
export const vxm = {
    user: createProxy(store, UserStore),
    breaks: createProxy(store, BreakStore),
    avatar: createProxy(store, AvatarStore),
    state: createProxy(store, UIStateStore)
};
