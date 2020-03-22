<template>
    <v-layout row align-center justify-center>
        <v-card v-for="breakOption in possibleActivities" class="ma-2 breakCard">
            <v-layout column d-flex fill-height>
                <v-card-title class="display-1">
                    {{breakOption.name}}
                    <v-chip v-for="cat in breakOption.category" outlined color="primary" small class="ml-2">
                        {{cat}}
                    </v-chip>
                </v-card-title>
                <v-card-text class="subtitle-1 font-weight-light">
                    {{breakOption.description}}
                </v-card-text>
                <v-img :src="breakOption.content" v-if="breakOption.contentType === 'Bild'"/>

                <v-spacer/>
                <v-card-actions>
                    <v-btn color="primary" block @click="chooseBreak(breakOption.id)" class="mb-2">
                        Go
                    </v-btn>
                </v-card-actions>
            </v-layout>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import {BreakActivityRecommender} from "~/data/IBreakActivityRecommender";
    import {BreakActivity} from "~/data/IBreakActivityRepo";

    @Component({components: {Logo}})
    export default class StartWorkday extends Vue {

        private breakActivityRecommender: BreakActivityRecommender = new BreakActivityRecommender();

        get possibleActivities(): BreakActivity[] {
            return this.breakActivityRecommender.getRecommendedBreakActivities(vxm.user.avatar);
        }

        get user() {
            return vxm.user;
        }

        chooseBreak(breakId: string) {
            vxm.user.selectBreak(breakId);
        }

    }
</script>

<style scoped>
    .breakCard {
        max-width: 25vw;
        height: 40vh;
    }

</style>
