<template>
    <v-row>
        <v-hover v-slot:default="{ hover }" v-for="mood in moods">
            <div class="d-flex flex-column hoverable">
                <v-btn text @click="changeMood(mood.id)" fab>
                    <span :class="{ 'on-hover': (hover || mood.id === activeMood) }">{{mood.emoji}} </span>
                </v-btn>
                <span class="explanation text-center">{{mood.id}}</span>
            </div>
        </v-hover>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";

    @Component
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

<style scoped lang="scss">

    span {
        transition: opacity .4s ease-in-out;
        font-size: 3em;
    }

    span:not(.on-hover) {
        opacity: 0.6;
        font-size: 2em;
    }

    .explanation {
        visibility: hidden;
        font-size: 0.8em !important;
    }

    .hoverable:hover {

        .explanation {
            visibility: visible;
        }

    }

</style>
