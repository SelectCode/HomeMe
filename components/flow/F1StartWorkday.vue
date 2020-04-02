<template>
    <v-row justify="center">
        <v-col cols="12" xl="4" md="6">
            <v-card>
                <v-card-title class="headline">
                    Guten Tag, {{user.name}}
                </v-card-title>
                <v-card-text>
                    Ich werde dich heute begleiten, um dich noch produktiver zu machen. Ich erinnere dich an Pausen und
                    Trinken.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="start">
                        Lass uns loslegen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import {ITextRecommender} from "~/businesslogic/avatar/text/ITextRecommender";
    import {TextRecommender} from "~/businesslogic/avatar/text/TextRecommender";

    @Component
    export default class StartWorkday extends Vue {

        private textRecommender: ITextRecommender = new TextRecommender();

        get user() {
            return vxm.user;
        }

        async start() {
            if (Notification.permission !== 'granted') {
                await Notification.requestPermission();
            }
            await vxm.state.startWorkday();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        mounted() {
            this.$root.$emit('chat', this.textRecommender.getText());
        }

    }
</script>

<style scoped>
    .flex-grow-0 {
        flex-grow: 0 !important;
    }
</style>
