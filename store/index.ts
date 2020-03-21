import {Store} from 'vuex'
import {createProxy, extractVuexModule} from "vuex-class-component/js";
import {UserStore} from "~/store/UserModule";
import VuexPersistence from "vuex-persist";


const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})


export const store = new Store({
    modules: {
        ...extractVuexModule(UserStore)
    },
    plugins: [vuexLocal.plugin]
});


// Creating proxies.
export const vxm = {
    user: createProxy(store, UserStore),
}
