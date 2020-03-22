<template>
    <div/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from "~/store";
    import {ITimeRecommenderImpl} from "~/data/ITimeRecommender";

    @Component({components: {Logo}})
    export default class Timer extends Vue {

        mounted() {
            let recommender = new ITimeRecommenderImpl();
            let recommendations = recommender.getRecommendedTimesForSettings(this.user.settings);
            this.sendNotification(recommendations.length.toString());
        }

        get user() {
            return vxm.user;
        }

        get avatarPicture() {
            let avatar = this.user.avatar;
            return 'avatar/' + avatar + '.svg'
        }


        sendNotification(text: string) {
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
