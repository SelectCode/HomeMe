<template>
    <v-row justify="center">
        <v-card class="ma-2">
            <v-card-title class="display-1">
                Ciao 🙋‍♂️🙋‍♂️
            </v-card-title>
            <v-card-text class="subtitle-1 font-weight-light">
                Gönn dir!
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="back" class="mb-2" large>
                    Back
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'
    import {TextRecommender} from "~/data/ITextRecommender";

    @Component({components: {Logo}})
    export default class EndWorkDay extends Vue {

        private textRecommender = new TextRecommender();

        get user() {
            return vxm.user;
        }

        back() {
            this.user.backToStart();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

    }
</script>

<style scoped>

</style>
