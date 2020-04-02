<template>
    <div>
        <v-row justify="center">
            <v-col v-for="breakOption in possibleActivities" xl="4" md="6" sm="8" xs="12">
                <v-card class="ma-2 break-card">
                    <BreakComponent :break-activity="breakOption"/>
                    <v-card-actions class="card-actions">
                        <v-btn color="primary" block @click="chooseBreak(breakOption.name)">Go</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-3">
            <v-btn @click="loadActivities" text>
                Mehr Optionen
                <v-icon right color="primary">mdi-restart</v-icon>
            </v-btn>
        </v-row>
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import {BreakActivityRecommender} from "~/businesslogic/break/IBreakActivityRecommender";
    import BreakComponent from "~/components/break/BreakComponent.vue";
    import {BreakActivity} from "~/model/BreakActivity";
    import {TextRecommender} from "~/businesslogic/avatar/text/TextRecommender";

    @Component({components: {BreakComponent}})
    export default class ChooseBreak extends Vue {

        private breakActivityRecommender: BreakActivityRecommender = new BreakActivityRecommender();
        private textRecommender = new TextRecommender();

        possibleActivities: BreakActivity[] = [];

        async mounted() {
            this.loadActivities();
        }

        loadActivities() {
            this.possibleActivities = this.breakActivityRecommender.getRecommendedBreakActivities(vxm.avatar.avatar);
        }

        get user() {
            return vxm.user;
        }

        chooseBreak(breakId: string) {
            vxm.state.selectBreak(breakId);
            console.log('Selecting break ' + breakId);
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
