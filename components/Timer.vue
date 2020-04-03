<template>
    <div class="timer mx-5 my-5">
    {{hoursText}}:{{minutesText}}:{{secondsText}}
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {Duration} from "~/businesslogic/break/TimeUtils";

    @Component
    export default class Timer extends Vue {

        @Prop({default: {hours: 0, minutes: 0, seconds: 0}})
        readonly elapsedTime!: Duration;

        get hoursText() {
            return this.pad(this.elapsedTime.hours, 2);
        }

        get minutesText() {
            return this.pad(this.elapsedTime.minutes, 2)
        }

        get secondsText() {
            return this.pad(this.elapsedTime.seconds, 2)
        }

        /**
         * Returns a string of desired length padded with leading 0s
         * @param digit Number to pad
         * @param size Desired final length
         */
        pad(digit: number, size: number) {
            let s = String(digit);
            while (s.length < (size || 2)) {
                s = "0" + s;
            }
            return s;
        }
    }
</script>

<style scoped>
    .timer {
        font-size: calc(3rem + 2vw);
        font-weight: 100;
    }
</style>
