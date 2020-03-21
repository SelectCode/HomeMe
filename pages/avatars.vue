<template>
    <v-container>
        <v-card-title class="display-2">Avatare</v-card-title>
        <v-layout row justify-center align-center>
            <v-col v-for="avatar in avatars">
                <v-hover v-slot:default="{ hover }">
                    <v-card class="pa-2" :elevation="hover ? 12 : 2" @click="select(avatar)">
                        <v-card-title class="display-1">
                            {{avatar.name}}
                            <v-icon dark color="primary" v-if="avatar.id === user.avatar" size="40" class="ml-2">
                                mdi-check
                            </v-icon>
                        </v-card-title>
                        <AvatarImage :avatar="avatar.id"/>
                        <v-card-text>{{avatar.introduction}}</v-card-text>
                        <v-layout justify-center align-bottom>
                            <v-chip v-for="tag in avatar.tags" text-color="primary" pill outlined color="primary">
                                <b>{{tag}}</b>
                            </v-chip>
                        </v-layout>
                    </v-card>
                </v-hover>
            </v-col>
        </v-layout>
    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import {Avatar, AvatarRepo, IAvatarRepo} from "~/data/IAvatarRepo";
    import AvatarImage from "~/components/AvatarImage.vue";

    @Component({
        components: {AvatarImage}
    })
    export default class Index extends Vue {
        private avatarRepo: IAvatarRepo = new AvatarRepo();
        private avatars: Avatar[] = [];

        // @ts-ignore
        async mounted(): void {
            // @ts-ignore
            this.avatars = await this.avatarRepo.getAvatars();
        }

        get user() {
            return vxm.user
        }

        select(avatar: Avatar) {
            this.user.setAvatar(avatar.id)
        }
    }
</script>
<style>
    .v-card {
        transition: opacity .4s ease-in-out;
    }

    .v-card:not(.on-hover) {
        opacity: 1;
    }

</style>
