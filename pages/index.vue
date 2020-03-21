<template>
    <v-layout column justify-center align-center>
        <v-card-title class="display-2">HomeMe</v-card-title>
        <v-flex>
            <div class="text-center">
                <AvatarImage :avatar="user.avatar"/>
            </div>
            <StartWorkday v-if="showStartWorkday"/>
            <DuringWorkday v-if="showWorkDay"/>
            <ChooseBreak v-if="showChoose"/>
            <Break v-if="showBreak"/>
        </v-flex>
        <SettingsDialog/>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import StartWorkday from "~/components/1StartWorkday.vue";
    import {vxm} from "~/store";
    import DuringWorkday from "~/components/2DuringWorkday.vue";
    import SettingsDialog from "~/components/SettingsDialog.vue";
    import AvatarImage from "~/components/AvatarImage.vue";
    import ChooseBreak from "~/components/3ChooseBreak.vue";
    import Break from "~/components/4Break.vue";
    import {UiState} from "~/store/UserModule";

    @Component({components: {ChooseBreak, AvatarImage, DuringWorkday, StartWorkday, Logo, SettingsDialog, Break}})
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }

        get showStartWorkday() {
            return vxm.user.state === UiState.PREWORK;
        }

        get showWorkDay() {
            return vxm.user.state === UiState.WORKING;
        }

        get showChoose() {
            return vxm.user.state === UiState.CHOOSE_BREAK;
        }

        get showBreak() {
            return vxm.user.state === UiState.BREAK;
        }

    }

</script>
