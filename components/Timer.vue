<template>
    <span class="timer">
        {{minutesText}} : {{secondsText}}
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'

    @Component({components: {Logo}})
    export default class Timer extends Vue {

        @Prop()
        minutes!: number;

        get minutesText() {
            return this.pad(this.minutes, 2)
        }

        get secondsText() {
            return this.pad(this.seconds, 2)
        }

        @Prop()
        seconds!: number;

        pad(digit: number, size: number) {
            var s = String(digit);
            while (s.length < (size || 2)) {
                s = "0" + s;
            }
            return s;
        }

    }


</script>

<style scoped>
    .timer {
        font-size: 3em;
        font-weight: lighter;
    }

</style>
