<template>
    <v-row justify="center">
        <v-col v-for="breakOption in possibleActivities" :cols="4">
            <v-card class="ma-2 break-card">
                <BreakComponent :break-activity="breakOption"/>
                <v-card-actions class="card-actions">
                    <v-btn color="primary" block @click="chooseBreak(breakOption.name)">Go</v-btn>
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
    import {BreakActivity} from "~/data/IBreakActivityRepo";
    import {TextRecommender} from "~/data/ITextRecommender";
    import BreakComponent from "~/components/BreakComponent.vue";

    @Component({components: {BreakComponent, Logo}})
    export default class StartWorkday extends Vue {

        private breakActivityRecommender: BreakActivityRecommender = new BreakActivityRecommender();
        private textRecommender = new TextRecommender();

        get possibleActivities(): BreakActivity[] {
            return this.breakActivityRecommender.getRecommendedBreakActivities(vxm.user.avatar);
        }

        get user() {
            return vxm.user;
        }

        chooseBreak(breakId: string) {
            vxm.user.selectBreak(breakId);
            this.$root.$emit('chat', this.textRecommender.getText());
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
