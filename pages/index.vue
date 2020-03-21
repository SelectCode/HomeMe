<template>
    <v-layout column justify-center align-center>
        <v-flex>
            <div class="text-center">
                <Logo/>
            </div>
            <v-card>
                <v-card-title class="headline">
                    Willkommen! {{user.axles}}
                </v-card-title>
                <v-card-actions>
                    <v-btn color="primary" block @click="incr">
                        Start Workday
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Logo from '@/components/Logo'
    import {userStore} from "~/utils/store-accessor";

    @Component({components: {Logo}})
    export default class Index extends Vue {

        get user() {
            return userStore;
        }

        incr() {
            this.user.incrWheels(2)
        }

    }

</script>
