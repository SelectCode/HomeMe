<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" class="mt-2">
                <v-icon color="primary">`
                    mdi-cog
                </v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title primary-title>
                Settings
            </v-card-title>

            <v-text-field class="ma-3" label="Name" v-model="username"></v-text-field>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        text
                        @click="save">
                    OK
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";

    @Component
    export default class SettingsDialog extends Vue {
        dialog = false;

        mounted() {
            this.username = vxm.user.name;
        }

        username = '';

        save() {
            vxm.user.changeName(this.username);
            this.dialog = false;
        }

    }
</script>

<style scoped>

</style>
