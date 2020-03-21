<template>
    <v-layout column justify-center align-center my-auto>
        <v-card-title class="mb-5" id="heading">HomeMe</v-card-title>
        <v-flex class="mt-5">
            <v-layout row>
                <div class="text-center">
                    <AvatarImage :avatar="user.avatar"/>
                </div>
                <Speechbubble/>
            </v-layout>
            <StartWorkday v-if="showStartWorkday"/>
            <DuringWorkday v-if="showWorkDay"/>
            <ChooseBreak v-if="showChoose"/>
            <Break v-if="showBreak"/>
            <EndWorkDay v-if="showEnd"/>
        </v-flex>
        <v-layout >
            <SettingsDialog/>
            <v-btn icon @click="reset" class="mt-2">
                <v-icon color="primary">`
                    mdi-restart
                </v-icon>
            </v-btn>
        </v-layout>

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
    import EndWorkDay from "~/components/5EndWorkDay.vue";
    import {AvatarTextRepo} from "~/data/IAvatarTextRepo";
    import Speechbubble from "~/components/Speechbubble.vue";

    @Component({
        components: {
            Speechbubble,
            EndWorkDay,
            ChooseBreak, AvatarImage, DuringWorkday, StartWorkday, Logo, SettingsDialog, Break
        }
    })
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }

        async mounted() {
            await vxm.user.loadAvatarTexts()
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
            new AvatarTextRepo().getAvatarTexts();
            return vxm.user.state === UiState.BREAK;
        }

        get showEnd() {
            return vxm.user.state === UiState.AFTER_WORK;
        }

        reset(){
            this.user.reset()
        }

    }

</script>

<style>
    #heading {
        font-weight: lighter;
        font-size: 3em;
    }
</style>
