<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-card class="text-center">
                    <v-card-title class="display-1 text-center">
                        Pause
                    </v-card-title>
                    <Timer :elapsed-time="remainingTime"/>
                    <v-card-actions>
                        <v-btn color="primary" block @click="stopBreak" class="mb-2" large>
                            Pause beenden
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col md="6" sm="8" cols="12">
                <v-card class="ma-2 breakCard text-center">
                    <BreakComponent :break-activity="breakActivity" :show-link="true"/>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn @click="like" text v-if="!liked">
                            Like
                            <v-icon color="red" right>mdi-heart</v-icon>
                        </v-btn>
                        <v-spacer/>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import Timer from "~/components/Timer.vue";
    import BreakComponent from "~/components/break/BreakComponent.vue";
    import firebase from "firebase";
    import {TextRecommender} from "~/businesslogic/avatar/text/TextRecommender";
    import {Duration, TimeUtils} from "~/businesslogic/break/TimeUtils";

    @Component({components: {BreakComponent, Timer}})
    export default class Break extends Vue {

        private textRecommender = new TextRecommender();

        private remainingTime: Duration = {hours: 0, minutes: 0, seconds: 0};

        get user() {
            return vxm.user;
        }

        stopBreak() {
            vxm.state.stopBreak();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        get breakActivity() {
            return vxm.breaks.currentBreakActivity
        }

        async like() {
            let collection = this.$fireStore.collection('breakFeedback');
            let doc = await collection.doc(this.breakActivity?.id.toString());
            const increment = firebase.firestore.FieldValue.increment(1);
            doc.set({
                likes: increment
            }, {merge: true});
            this.liked = true
        }

        liked = false;

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
            let finishedDate = vxm.breaks.breakStarted as number + this.durationInMS;

            const remainingSeconds = TimeUtils.getRemainingSecondsUntil(finishedDate);
            this.remainingTime = TimeUtils.getTimeComponents(remainingSeconds);

            if (remainingSeconds < 1) {
                this.running = false;
                this.playAudio();
            }
        }

        playAudio() {
            let audio = new Audio('/alarmfinished.mp3');
            audio.play();
        }

    }
</script>

<style scoped>

</style>
