<template>
    <v-layout row align-center justify-center>
        <v-card v-for="breakOption in breakOptions" class="ma-2 breakCard">
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
            <v-card-actions class="card-actions">
                <v-btn color="primary" block @click="chooseBreak(breakOption.id)">
                    Go
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import {BreakActivityRecommender} from "~/data/IBreakActivityRecommender";
    import {AvatarRepo} from "~/data/IAvatarRepo";
    import {BreakActivity} from "~/data/IBreakActivityRepo";

    @Component({components: {Logo}})
    export default class StartWorkday extends Vue {

        private breakActivityRecommender: BreakActivityRecommender = new BreakActivityRecommender();
        private possibleActivities: BreakActivity[] = [];

        async mounted() {
            this.possibleActivities = await this.getPossibleBreakActivities();
        }

        private async getPossibleBreakActivities() {
            let avatar = await new AvatarRepo().getById(this.user.avatar);

            if (avatar == undefined) {
                return []
            } else {
                return await this.breakActivityRecommender.getRecommendedBreakActivities(avatar, this.user.breakActivity);
            }
        }

        get user() {
            return vxm.user;
        }

        chooseBreak(breakId: string) {
            vxm.user.selectBreak(breakId);
        }

        get breakOptions() {
            return this.possibleActivities;
        }


    }
</script>

<style scoped>
    .breakCard {
        width: 25vw;
        height: 40vh;
        position: relative;
        padding-bottom: 50px;
    }

    .card-actions {
        position: absolute;
        bottom: 0;
    }

</style>
