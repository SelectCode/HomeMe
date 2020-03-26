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
            avatarId: "101",
            childrenAtHome: true,
            drinkingReminders: true,
            //pauseReminders: boolean => Assumption: A user without kids wants take 5min pauses
            snackReminders: false,
            //lunchBreak: boolean,
            //lunchBreakTime: number, // evtl. in Date ändern
            breakDuration: 5,
            workingHours: 8,
            mood: 'happy' // 'happy', 'neutral', 'sick', 'lazy', 'drunk', 'tired'
        }

        get result(){
            return new ITimeRecommenderImpl().getRecommendedTimesForSettings(this.settings)
        }

    }
</script>
