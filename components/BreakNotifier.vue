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
        private timer!: number;

        mounted() {
            let recommender = new ITimeRecommenderImpl();
            this.recommendations = recommender.getRecommendedTimesForSettings(this.user.settings);
            this.recommendations.sort((a, b) => a.inMinutes - b.inMinutes);
            console.log('Sending notifications in minutes ' + this.recommendations.map(it => it.inMinutes))
            this.timer = window.setInterval(this.checkForBreak, 1000 * 60);
        }

        destroyed() {
            window.clearInterval(this.timer)
        }

        checkForBreak() {
            let workedMinutes = WorkTimeCalculator.remainingMinutes();
            let breakActivity = this.recommendations.find(it => it.inMinutes === workedMinutes);
            if (breakActivity) {
                let notificationText = '';
                console.log(breakActivity);
                if (breakActivity.type === 'drinking') {
                    notificationText = 'Trink mal was!';
                } else if (breakActivity.type === 'snack') {
                    notificationText = 'Lust auf einen kleinen Snack?'
                } else {
                    notificationText = `Zeit für eine Pause!`;
                }
                vxm.user.setBreakType(breakActivity.type);
                console.log(breakActivity.type);
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
