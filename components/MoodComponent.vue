<template>
    <v-layout row>
        <v-hover v-slot:default="{ hover }" v-for="mood in moods">
            <v-btn text @click="changeMood(mood.id)" fab>
                <span :class="{ 'on-hover': (hover || mood.id === activeMood) }">{{mood.emoji}} </span>
            </v-btn>
        </v-hover>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from "~/store";

    @Component({components: {Logo}})
    export default class Timer extends Vue {

        moods = [
            // 'happy', 'neutral', 'sick', 'lazy', 'drunk', 'tired'
            {
                emoji: '😊',
                id: 'happy'
            },
            {
                emoji: '😐',
                id: 'neutral'
            },
            {
                emoji: '🤧',
                id: 'sick'
            },
            {
                emoji: '😌',
                id: 'lazy'
            },
            {
                emoji: '😴',
                id: 'tired'
            }
        ];

        get activeMood() {
            return vxm.user.settings.mood ?? '';
        }

        changeMood(mood: string) {
            vxm.user.setMood(mood)
        }

    }


</script>

<style scoped>
    .timer {
        font-size: 3em;
        font-weight: lighter;
    }

    span {
        transition: opacity .4s ease-in-out;
        font-size: 3em;
    }

    span:not(.on-hover) {
        opacity: 0.6;
        font-size: 2em;
    }

</style>
