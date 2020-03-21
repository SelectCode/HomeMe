<template>
    <v-layout row>
        <v-card v-for="breakOption in breakOptions" class="ma-2">
            <v-card-title class="display-1">
                {{breakOption.title}}
            </v-card-title>
            <v-card-text class="subtitle-1 font-weight-light">
                {{breakOption.description}}
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="chooseBreak(breakOption.id)" class="mb-2" large>
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

        // @ts-ignore
        async mounted(): void {
            this.possibleActivities = await this.getPossibleBreakActivities();
        }

        private async getPossibleBreakActivities() {
            let avatar = await new AvatarRepo().getById(this.user.avatar);

            if (avatar == undefined) {
                return []
            } else {
                return await this.breakActivityRecommender.getRecommendedBreakActivities(avatar);
            }
        }

        get user() {
            return vxm.user;
        }

        chooseBreak(breakId: string) {
            vxm.user.selectBreak(breakId);
        }

        get breakOptions() {
            return this.possibleActivities.map((it) => {
                return {
                    title: it.name,
                    description: it.description
                }
            });
        }


    }
</script>

<style scoped>

</style>
