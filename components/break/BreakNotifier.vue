<template>
    <div/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import {ITimeRecommenderImpl, Reminder} from "~/businesslogic/avatar/text/ITimeRecommender";
    import {TimeUtils} from "~/businesslogic/break/TimeUtils";

    @Component
    export default class Timer extends Vue {
        private recommendations: Reminder[] = [];
        private timer!: number;

        recommender = new ITimeRecommenderImpl();

        mounted() {
            this.loadRecommendations();
            this.timer = window.setInterval(this.checkForBreak, 1000 * 60);
        }

        //TODO: Watch mood to reload recommendation
        loadRecommendations() {
            this.recommendations = this.recommender.getRecommendedTimesForSettings(this.user.settings);
            this.recommendations.sort((a, b) => a.inMinutes - b.inMinutes);
            console.log('Sending notifications in minutes ' + this.recommendations.map(it => it.inMinutes))
        }

        destroyed() {
            window.clearInterval(this.timer)
        }

        get mood() {
            return this.user.settings.mood;
        }

        checkForBreak() {
            let workedMinutes = TimeUtils.getTimeComponents(vxm.state.workStart!).minutes;
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
                vxm.breaks.setBreakType(breakActivity.type);
                console.log(breakActivity.type);
                this.sendNotification(notificationText);
            }
        }

        get user() {
            return vxm.user;
        }

        get avatarPicture() {
            let avatar = vxm.avatar.avatar;
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
