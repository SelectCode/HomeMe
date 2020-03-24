<template>
    <v-row justify="center">
        <v-card>
            <v-layout column justify-center align-center class="px-5">
                <v-card-title class="display-1 mb-5 ">
                    Gute Arbeit {{user.name}}
                </v-card-title>
                <span>Du arbeitest seit:</span>
                <Timer :minutes="workedMinutes" :seconds="workedSeconds" class="display-4 mb-5"/>
            </v-layout>
            <BreakNotifier/>
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
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import Timer from "~/components/Timer.vue";
    import BreakComponent from "~/components/BreakComponent.vue";
    import BreakNotifier from "~/components/BreakNotifier.vue";
    import {TextRecommender} from "~/data/ITextRecommender";
    import {WorkTimeCalculator} from "~/data/WorkTimeCalculator";

    @Component({components: {BreakNotifier, BreakComponent, Timer, Logo}})
    export default class StartWorkday extends Vue {

        private textRecommender = new TextRecommender();

        get user() {
            return vxm.user;
        }

        makeABreak() {
            vxm.user.chooseBreak();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        mounted() {
            this.refreshTime();
            setInterval(this.refreshTime, 1000);
            setInterval(this.saySomething, 60 * 1000);
        }

        saySomething() {
            this.$root.$emit('chat', this.textRecommender.getText());
        }


        stopDay() {
            vxm.user.endWorkday();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        async refreshTime() {
            this.workTime = await this.user.workingTime(Date.now());
            this.calcRemainingTime()
        }

        workTime = 0;

        workedSeconds = 0;
        workedMinutes = 0;

        calcRemainingTime() {
            this.workedMinutes = WorkTimeCalculator.remainingMinutes();
            this.workedSeconds = WorkTimeCalculator.remainingSeconds();
        }


    }
</script>

<style scoped>
</style>
