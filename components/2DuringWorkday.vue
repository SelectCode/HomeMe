<template>
    <v-card>
        <v-layout column justify-center align-center>
            <v-card-title class="display-1">
                Gute Arbeit {{user.name}}
            </v-card-title>
            <span>Du arbeitest seit:</span>
            <Timer :minutes="workedMinutes" :seconds="workedSeconds"/>
        </v-layout>

        <v-card-actions>
            <v-layout column class="ma-2">
                <v-btn color="primary" block @click="makeABreak" class="mb-2" large>
                    Mach eine Pause
                </v-btn>
                <v-btn color="error" block @click="stopDay" class="mb-2" large>
                    Workday beenden
                </v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import Timer from "~/components/Timer.vue";

    @Component({components: {Timer, Logo}})
    export default class StartWorkday extends Vue {

        get user() {
            return vxm.user;
        }

        makeABreak() {
            vxm.user.chooseBreak();
        }

        mounted() {
            this.refreshTime();
            setInterval(this.refreshTime, 1000)
        }

        stopDay() {
            vxm.user.endWorkday()
        }

        async refreshTime() {
            this.workTime = await this.user.workingTime(Date.now());
            this.calcRemainingTime()
        }

        workTime = 0;

        workedSeconds = 0;
        workedMinutes = 0;

        calcRemainingTime() {
            let startedWork = this.user.workStart as number;
            let currentDate = Date.now();
            this.workedSeconds = (currentDate - startedWork) / 1000;
            this.workedMinutes = Math.floor(this.workedSeconds / 60);
            this.workedSeconds = Math.floor(this.workedSeconds - this.workedMinutes * 60)
        }


    }
</script>

<style scoped>

</style>
