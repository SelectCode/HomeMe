<template>
    <v-container>
        <v-card-title class="display-2">Avatare</v-card-title>
        <v-layout row justify-center align-center>
            <v-col v-for="avatar in avatars">
                <v-card class="pa-2" >
                    <v-card-title class="display-1">{{avatar.name}}</v-card-title>
                    <v-img max-width="200" :src="avatar.image"/>
                    <v-card-text>{{avatar.description}}</v-card-text>
                </v-card>
            </v-col>
        </v-layout>
    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import {MockAvatarImpl} from "~/data/IAvatarRepo";

    @Component
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }

        get avatars() {
            let repo = new MockAvatarImpl();
            return repo.getAvatars()
        }
    }
</script>
