import {Store} from 'vuex'
import {createProxy, extractVuexModule} from "vuex-class-component/js";
import {UserStore} from "~/store/UserModule";

export const store = new Store({
    modules: {
        ...extractVuexModule(UserStore)
    }
});


// Creating proxies.
export const vxm = {
    user: createProxy(store, UserStore),
}
