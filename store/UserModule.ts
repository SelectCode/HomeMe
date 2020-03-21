import {Module, Mutation, VuexModule} from 'vuex-module-decorators'

@Module({
    name: 'user',
    stateFactory: true,
    namespaced: true,
})
export default class UserModule extends VuexModule {
    wheels = 2;

    @Mutation
    incrWheels(extra: number) {
        this.wheels += extra
    }

    get axles() {
        return this.wheels / 2
    }
}
