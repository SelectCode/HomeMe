<template>
    <div/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from "~/store";
    import {ITimeRecommenderImpl, Reminder} from "~/data/ITimeRecommender";
    import {WorkTimeCalculator} from "~/data/WorkTimeCalculator";

    @Component({components: {Logo}})
    export default class Timer extends Vue {

        private recommendations: Reminder[] = [];

        mounted() {
            let recommender = new ITimeRecommenderImpl();
            this.recommendations = recommender.getRecommendedTimesForSettings(this.user.settings);
            this.sendNotification(this.recommendations.length.toString());

            console.log('Notification sent!');
            console.log(this.recommendations);
            this.recommendations.push(new class implements Reminder {
                inMinutes: number = 1;
                type: "drinking" | "break" | "snack" | "Bewegungspause" | "Erfrischungspause" | "Denkpause" | "Soziale Pause" | "Ruhepause" = 'Bewegungspause';
            });
            setInterval(this.checkForBreak, 1000 * 60);
        }

        checkForBreak() {
            let workedMinutes = WorkTimeCalculator.remainingMinutes();
            let breaksToStart = this.recommendations.filter((it) => it.inMinutes = workedMinutes);
            if (breaksToStart.length != 0) {
                let newBreak = breaksToStart[0];
                let notificationText = '';
                console.log(newBreak);

                if (newBreak.type === 'drinking') {
                    notificationText = 'Trink mal was!';
                } else if (newBreak.type === 'snack') {
                    notificationText = 'Lust auf einen kleinen Snack?'
                } else {
                    notificationText = `Zeit für eine Pause!`;
                }

                vxm.user.setBreakType(newBreak.type);
                console.log(newBreak.type);
                this.sendNotification(notificationText);
            }
        }

        get user() {
            return vxm.user;
        }

        get avatarPicture() {
            let avatar = this.user.avatar;
            return 'avatar/' + avatar + '.svg'
        }

        sendNotification(text: string) {
            console.log("Sending notifcation:" + text);
            var notification = new Notification("HomeMe", {
                body: text,
                icon: this.avatarPicture
            });
        }


    }

</script>

<style scoped>
    .timer {
        font-size: 3em;
        font-weight: lighter;
    }

</style>
