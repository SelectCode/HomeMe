<template>
    <v-row justify="center">
        <v-col>
            <v-card>
                <v-layout column justify-center align-center class="px-5">
                    <v-card-title class="display-1 mb-5 nobreak">
                        Gute Arbeit {{user.name}}
                    </v-card-title>
                    <span>Du arbeitest seit:</span>
                    <Timer :elapsed-time="elapsedTime" />
                </v-layout>
                <BreakNotifier/>
                <v-card-actions>
                    <v-layout column class="ma-2">
                        <v-btn color="primary" block @click="makeABreak" class="mb-2" large>
                            Mach eine Pause
                        </v-btn>
                        <v-btn color="error" block @click="stopDay" class="mb-2" large>
                            Workday beenden
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import Timer from "~/components/Timer.vue";
    import BreakComponent from "~/components/break/BreakComponent.vue";
    import BreakNotifier from "~/components/break/BreakNotifier.vue";
    import {TextRecommender} from "~/businesslogic/avatar/text/TextRecommender";
    import {Duration, TimeUtils} from "~/businesslogic/break/TimeUtils";

    @Component({components: {BreakNotifier, BreakComponent, Timer}})
    export default class DuringWorkday extends Vue {

        private textRecommender = new TextRecommender();

        private elapsedTime: Duration = {hours: 0, minutes: 0, seconds: 0};

        get user() {
            return vxm.user;
        }

        async refreshTime() {
            const elapsed = TimeUtils.getElapsedSecondsSince(vxm.state.workStartTime);
            this.elapsedTime = TimeUtils.getTimeComponents(elapsed);
        }

        makeABreak() {
            vxm.state.chooseBreak();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        mounted() {
            setInterval(this.refreshTime, 1000);
            setInterval(this.saySomething, 60 * 1000);
            this.$fireDb.goOnline();
            this.$fireDb.ref(this.user.name).push(vxm.avatar.avatar)
        }

        saySomething() {
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        stopDay() {
            vxm.state.endWorkday();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

    };
</script>

<style scoped lang="scss">
    .nobreak{
        word-break: keep-all;
    }
</style>
