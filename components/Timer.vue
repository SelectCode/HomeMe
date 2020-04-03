<template>
    <span class="timer">
    {{hoursText}} : {{minutesText}} : {{secondsText}}
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {WorkTimeCalculator} from "~/businesslogic/break/WorkTimeCalculator";
    import {vxm} from "~/store";

    @Component
    export default class Timer extends Vue {

        @Prop()
        startTime!: number;

        elapsedTime = {hours: 0, minutes: 0, seconds: 0};

        mounted() {
            setInterval(this.refreshTime, 1000);
        }

        get hoursText() {
            return this.pad(this.elapsedTime.hours, 2);
        }

        get minutesText() {
            return this.pad(this.elapsedTime.minutes, 2)
        }

        get secondsText() {
            return this.pad(this.elapsedTime.seconds, 2)
        }

        async refreshTime() {
            this.elapsedTime = WorkTimeCalculator.getElapsedTimeComponents(vxm.state.workStartTime);
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
        font-size: 3rem;
        font-weight: lighter;
    }
</style>
