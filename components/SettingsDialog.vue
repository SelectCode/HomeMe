<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="mt-2" color="primary">
                <v-icon color="primary" left>`
                    mdi-cog
                </v-icon>
                Einstellungen
            </v-btn>
        </template>
        <v-card v-if="dialog">
            <v-card-title primary-title>
                Settings
            </v-card-title>
            <v-layout column class="mx-3">
                <v-text-field label="Name" v-model="username"></v-text-field>
                <v-slider min="1" max="18" v-model="settings.workingHours"
                          :label="'Arbeitszeit pro Tag ' + settings.workingHours + 'h'"/>
                <v-slider min="1" max="18" v-model="settings.breakDuration"
                          :label="'Pausendauer ' + settings.breakDuration + 'min'"/>
                <v-layout row justify-space-around="">
                    <v-switch class="mx-1" v-model="settings.drinkingReminders" label="Trink Reminder"/>
                    <v-switch class="mx-1" v-model="settings.snackReminders" label="Snack Erinnerung"/>
                    <v-switch class="mx-1" v-model="settings.childrenAtHome" label="Kinder zu Hause"/>
                </v-layout>
                <v-btn v-if="!notificationsAllowed" @click="allowNotifications">Notifications erlauben</v-btn>
                <v-card-text class="subtitle text-center " v-else>Notifications sind enabled!</v-card-text>
            </v-layout>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                       text
                       @click="save">
                    OK
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import {Settings} from "~/businesslogic/avatar/text/ITimeRecommender";

    @Component
    export default class SettingsDialog extends Vue {
        dialog = false;

        username = '';

        settings!: Settings;

        @Watch('dialog')
        loadSettings() {
            this.username = vxm.user.name;
            this.settings = vxm.user.settings;
        }

        save() {
            vxm.user.changeName(this.username);
            vxm.user.setSettings(this.settings);
            this.dialog = false;
        }

        async allowNotifications() {
            await Notification.requestPermission();
        }

        get notificationsAllowed() {
            return Notification.permission === 'granted'
        }

    }
</script>

<style scoped>

</style>
