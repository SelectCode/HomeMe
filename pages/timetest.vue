<template>
    <v-layout>
        <v-flex class="text-center">
            <v-card class="display-1">
                <v-row v-for="res in result" class="ma-5">
                    {{res.inMinutes}}: {{res.type}}
                </v-row>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">

    import {Vue} from "vue-property-decorator";
    import {ITimeRecommenderImpl} from "~/businesslogic/avatar/text/ITimeRecommender";
    import {vxm} from "~/store";

    export default class TimeTest extends Vue {

        get result() {
            return new ITimeRecommenderImpl().getRecommendedTimesForSettings(vxm.user.settings).sort((a,b) => a.inMinutes - b.inMinutes)
        }

    }
</script>
