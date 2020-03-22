<template>
    <v-row justify="center">
        <v-card class="flex-grow-0">
            <v-card-title class="headline">
                {{randomText}} {{user.name}}
            </v-card-title>
            <v-card-actions>
                <v-btn color="primary" block @click="start">
                    Start Workday
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
    import {ITextRecommender, TextRecommender} from "~/data/ITextRecommender";

    @Component({components: {Logo}})
    export default class StartWorkday extends Vue {

        private textRecommender: ITextRecommender = new TextRecommender();

        get user() {
            return vxm.user;
        }

        async start() {
            if (!Notification.permission) {
                await Notification.requestPermission()
            }
            await vxm.user.startWorkday();
            this.$root.$emit('chat', this.textRecommender.getText());
        }

        get availableTexts() {
            return this.user.avatarTexts
        }

        get randomText() {
            return this.availableTexts[0]
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
