<template>
    <v-layout>
        <v-flex class="text-center">
            <v-card class="display-1">
                {{result}}
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">

    import {Vue} from "vue-property-decorator";
    import {ITimeRecommenderImpl, Settings} from "~/data/ITimeRecommender";

    export default class TimeTest extends Vue {


        settings: Settings = {
            drinkingReminders: false,
            lunchBreak: false,
            pauseReminders: false,
            snackReminders: false,
            avatarId: 'lol',
            childrenAtHome: false
        };

        get result() {
            return new ITimeRecommenderImpl().getRecommendedTimesForSettings(this.settings)
        }

    }
</script>
