<template>
    <v-layout row>
        <v-card class="ma-2 breakCard text-center">
            <v-layout column justify-center align-center>
                <v-card-title class="display-1 text-center">
                    Pause
                </v-card-title>
                <v-card-text class="subtitle-1 font-weight-light">
                    Gönn dir!
                </v-card-text>
                <Timer :minutes="remainingMinutes" :seconds="remainingSeconds"/>
                <v-card-actions>
                    <v-btn color="primary" block @click="stopBreak" class="mb-2" large>
                        Stop now
                    </v-btn>
                </v-card-actions>
            </v-layout>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import Timer from "~/components/Timer.vue";

    @Component({components: {Timer, Logo}})
    export default class Break extends Vue {

        get user() {
            return vxm.user;
        }

        stopBreak() {
            vxm.user.stopBreak();
        }

        mounted() {
            this.calcRemainingTime();
            setInterval(this.calcRemainingTime, 1000)
        }

        running = true;

        calcRemainingTime() {
            if (!this.running) return;
            let finishedDate = this.user.breakStarted as number + 300_000;
            let currentDate = Date.now();
            this.remainingSeconds = (finishedDate - currentDate) / 1000;
            this.remainingMinutes = Math.floor(this.remainingSeconds / 60);
            this.remainingSeconds = Math.floor(this.remainingSeconds - this.remainingMinutes * 60)

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


        get break() {
            return {
                title: "Option A",
                id: 0,
                description: 'Tu das'
            }
        }


    }
</script>

<style scoped>
    .breakCard {
        width: 50vw;

    }
</style>
