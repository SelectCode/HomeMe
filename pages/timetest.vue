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
    import {ITimeRecommenderImpl} from "~/data/ITimeRecommender";
    import {vxm} from "~/store";

    export default class TimeTest extends Vue {

        get result() {
            return new ITimeRecommenderImpl().getRecommendedTimesForSettings(vxm.user.settings)
        }

    }
</script>
