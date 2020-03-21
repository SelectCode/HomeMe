<template>
    <v-container>
        <v-card-title class="display-2">Avatare</v-card-title>
        <v-layout row>
            <v-col v-for="avatar in avatars">
                <v-card>
                    <v-card-title>{{avatar.name}}</v-card-title>
                </v-card>
            </v-col>
        </v-layout>
    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";

    @Component
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }

        get avatars() {
            return [
                {
                    name: 'Gepard'
                },
                {
                    name: 'Schmetterling'
                },
            ]
        }
    }
</script>
