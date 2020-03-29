<template>
    <v-container>
        <v-row justify="center" class="grow-0">
            <h1 class="display-3 my-3 text-center">Avatare</h1>
        </v-row>
        <v-row justify-center class="grow-0">
            <v-col v-for="avatar in avatars">
                <v-hover v-slot:default="{ hover }">
                    <v-card class="pa-2 pb-4" :elevation="hover ? 12 : 2" @click="select(avatar)">
                        <div>
                            <v-card-title class="display-1">
                                {{avatar.name}}
                                <v-icon dark color="primary" v-if="avatar.id === selectedAvatar" size="40" class="ml-2">
                                    mdi-check
                                </v-icon>
                            </v-card-title>
                            <AvatarImage :avatar="avatar.id"/>
                            <v-card-text>{{avatar.introduction}}</v-card-text>
                        </div>
                        <v-layout justify-center align-end>
                            <v-chip v-for="tag in avatar.tags" text-color="primary" pill outlined color="primary">
                                <b>{{tag}}</b>
                            </v-chip>
                        </v-layout>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
        <FooterComponent/>
    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import AvatarImage from "~/components/avatar/AvatarImage.vue";
    import {Avatar} from "~/model/Avatar";
    import FooterComponent from "~/components/FooterComponent.vue";

    @Component({
        components: {FooterComponent, AvatarImage}
    })
    export default class Index extends Vue {

        get avatars() {
            return vxm.avatar.avatars
        }

        get selectedAvatar() {
            return vxm.avatar.avatar
        }

        async fetch() {
            await vxm.avatar.loadData();
            await vxm.breaks.loadData();
        }

        select(avatar: Avatar) {
            vxm.avatar.setAvatar(avatar.id)
        }
    }
</script>
<style scoped>

    .v-card {
        transition: opacity .4s ease-in-out;
    }

    .v-card:not(.on-hover) {
        opacity: 1;
    }

    .col, .v-card {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .grow-0 {
        flex-grow: 0;
    }

    h1 {
        font-weight: 200 !important;
    }

</style>
