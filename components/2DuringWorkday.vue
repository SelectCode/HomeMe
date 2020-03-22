<template>
    <v-card>
        <v-card-title class="display-1">
            Gute Arbeit {{user.name}}
        </v-card-title>
        <v-card-text class="subtitle-1 font-weight-light">
            Du arbeitest seit: {{millisecondsToStr(workTime)}}
        </v-card-text>
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

    @Component({components: {Logo}})
    export default class StartWorkday extends Vue {

        get user() {
            return vxm.user;
        }

        makeABreak() {
            vxm.user.chooseBreak();
        }

        mounted() {
            setInterval(this.refreshTime, 1000)
        }

        stopDay() {
            vxm.user.endWorkday()
        }

        async refreshTime() {
            this.workTime = await this.user.workingTime(Date.now());
        }

        workTime = 0;

        millisecondsToStr(milliseconds: number) {

            function numberEnding(number: number) {
                return (number > 1) ? 's' : '';
            }

            var temp = Math.floor(milliseconds / 1000);
            var years = Math.floor(temp / 31536000);
            if (years) {
                return years + ' year' + numberEnding(years);
            }
            //TODO: Months! Maybe weeks?
            var days = Math.floor((temp %= 31536000) / 86400);
            if (days) {
                return days + ' day' + numberEnding(days);
            }
            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours) {
                return hours + ' hour' + numberEnding(hours);
            }
            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes) {
                return minutes + ' minute' + numberEnding(minutes);
            }
            var seconds = temp % 60;
            if (seconds) {
                return seconds + ' second' + numberEnding(seconds);
            }
            return 'less than a second'; //'just now' //or other string you like;
        }


    }
</script>

<style scoped>

</style>
