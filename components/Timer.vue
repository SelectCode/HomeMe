<template>
    <span class="timer">
    {{hoursText}} : {{minutesText}} : {{secondsText}}
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import {WorkTimeCalculator} from "~/businesslogic/break/WorkTimeCalculator";

    @Component
    export default class Timer extends Vue {

        @Prop()
        startTime!: number;

        private hours = 0;
        private minutes = 0;
        private seconds = 0;

        mounted(){
            setInterval(this.refreshTime, 1000);
        }

        get hoursText() {
            return this.pad(this.hours, 2);
        }

        get minutesText() {
            return this.pad(this.minutes, 2)
        }

        get secondsText() {
            return this.pad(this.seconds, 2)
        }

        async refreshTime() {
            this.hours = WorkTimeCalculator.elapsedHours(this.startTime);
            this.minutes = WorkTimeCalculator.elapsedMinutes(this.startTime);
            this.seconds = WorkTimeCalculator.elapsedSeconds(this.startTime);
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
