<template>
    <v-layout column justify-center align-center>
        <v-row justify="center">
            <v-card class="ma-2 breakCard text-center">
                <v-layout column justify-center align-center>
                    <v-card-title class="display-1 text-center">
                        Pause
                    </v-card-title>
                    <Timer :minutes="remainingMinutes" :seconds="remainingSeconds"/>
                    <v-card-actions>
                        <v-btn color="primary" block @click="stopBreak" class="mb-2" large>
                            Pause beenden
                        </v-btn>
                    </v-card-actions>
                </v-layout>
            </v-card>
        </v-row>
        <v-row>
            <v-card class="ma-2 breakCard text-center">
                <BreakComponent :break-activity="breakActivity" :show-link="true"/>
            </v-card>
        </v-row>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import Timer from "~/components/Timer.vue";
    import {TextRecommender} from "~/data/ITextRecommender";
    import BreakComponent from "~/components/BreakComponent.vue";

    @Component({components: {BreakComponent, Timer, Logo}})
    export default class Break extends Vue {

        private textRecommender = new TextRecommender();

        get user() {
            return vxm.user;
        }

        stopBreak() {
            vxm.user.stopBreak();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        get breakActivity() {
            return this.user.currentBreakActivity
        }

        mounted() {
            this.calcRemainingTime();
            setInterval(this.calcRemainingTime, 1000)
        }

        get durationInMS() {
            return (this.breakActivity?.duration ?? 0) * 60 * 1000
        }

        running = true;

        calcRemainingTime() {
            if (!this.running) return;
            let finishedDate = this.user.breakStarted as number + this.durationInMS;
            let currentDate = Date.now();
            this.remainingSeconds = (finishedDate - currentDate) / 1000;
            this.remainingMinutes = Math.floor(this.remainingSeconds / 60);
            this.remainingSeconds = Math.floor(this.remainingSeconds - this.remainingMinutes * 60);

            if (finishedDate - currentDate < 1000) {
                this.running = false;
                this.remainingMinutes = 0;
                this.remainingSeconds = 0;
                this.playAudio();
            }
        }

        playAudio() {
            let audio = new Audio('/alarmfinished.mp3');
            audio.play();
        }

        remainingMinutes = 0;
        remainingSeconds = 0;


    }
</script>

<style scoped>
    .breakCard {
        width: 50vw;

    }
</style>
