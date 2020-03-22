<template>
    <v-layout row>
        <v-hover v-slot:default="{ hover }" v-for="mood in moods">
            <div>
                <v-btn text @click="changeMood(mood.id)" fab>
                    <span :class="{ 'on-hover': (hover || mood.id === activeMood) }">{{mood.emoji}} </span>
                </v-btn>
                <br/>
                <span v-if="hover" class="explanation mx-auto text-center d-flex justify-center align-center"> {{mood.id}}</span>
            </div>
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
            {
                emoji: '😊',
                id: 'happy'
            },
            {
                emoji: '😐',
                id: 'neutral'
            },
            {
                emoji: '🤒',
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

    span {
        transition: opacity .4s ease-in-out;
        font-size: 3em;
    }

    span:not(.on-hover) {
        opacity: 0.6;
        font-size: 2em;
    }

    .explanation {
        font-weight: lighter;
        font-size: 0.8em !important;
    }

</style>
