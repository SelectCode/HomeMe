<template>
    <v-row justify="center">
        <v-col v-for="breakOption in breakOptions" :cols="4">
            <v-card class="ma-2 break-card">
                <div>
                    <v-img :src="breakOption.content" v-if="breakOption.contentType === 'Bild'" height="200px"/>
                    <v-card-title class="display-1">
                        {{breakOption.name}}
                        <v-chip v-for="cat in breakOption.category" outlined color="primary" small class="ml-2">
                            {{cat}}
                        </v-chip>
                    </v-card-title>
                    <v-card-text class="subtitle-1 font-weight-light">
                        {{breakOption.description}}
                    </v-card-text>
                </div>
                <v-card-actions class="card-actions">
                    <v-btn color="primary" block @click="chooseBreak(breakOption.id)">Go</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
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
    .break-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
