<template>
    <v-row justify="center">
        <v-card class="ma-2 text-center">
            <v-card-title class="display-1">
                Schönen Feierabend!
            </v-card-title>
            <v-card-text class="subtitle-1 font-weight-light">
                Bis morgen.
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="back" class="mb-2" large>
                    Zurück
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import {TextRecommender} from "~/businesslogic/avatar/text/TextRecommender";

    @Component
    export default class EndWorkDay extends Vue {

        private textRecommender = new TextRecommender();

        get user() {
            return vxm.user;
        }

        back() {
            vxm.state.backToStart();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

    }
</script>

<style scoped>

</style>
