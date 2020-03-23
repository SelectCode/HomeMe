<template>
    <v-container>
        <v-row justify="center" class="grow-0">
            <h1 class="display-3 my-3 text-center">HomeMe</h1>
        </v-row>
        <v-row class="mt-5 flex-column grow-0">
            <v-row justify="center" class="my-5 ">
                <div class="text-center">
                    <AvatarImage :avatar="user.avatar"/>
                </div>
                <Speechbubble/>
            </v-row>

            <StartWorkday v-if="showStartWorkday"/>
            <DuringWorkday v-if="showWorkDay"/>
            <ChooseBreak v-if="showChoose"/>
            <Break v-if="showBreak"/>
            <EndWorkDay v-if="showEnd"/>
            <MoodComponent class="justify-center mt-4"/>
        </v-row>
        <v-row justify="end" class="grow-0">
            <SettingsDialog/>
            <v-btn icon @click="reset" class="mt-2">
                <v-icon color="primary">mdi-restart</v-icon>
            </v-btn>
            <v-btn icon href="https://github.com/SelectCode/HomeMe" target="_blank" class="mt-2">
                <v-icon color="primary">mdi-github</v-icon>
            </v-btn>
        </v-row>
    </v-container>
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
    import MoodComponent from "~/components/MoodComponent.vue";

    @Component({
        components: {
            MoodComponent,
            Speechbubble,
            EndWorkDay,
            ChooseBreak, AvatarImage, DuringWorkday, StartWorkday, Logo, SettingsDialog, Break
        }
    })
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }

        get showStartWorkday() {
            return vxm.user.state === UiState.BEFORE_WORK;
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

        reset() {
            this.user.reset()
        }

        mounted() {
            console.log("loading data");
            this.user.loadData();
            if (vxm.user.name === '') {
                this.$router.push('/intro')
            }
        }

    }

</script>

<style scoped>

    h1 {
        font-weight: 200 !important;
    }

    #heading {
        font-weight: lighter;
        font-size: 3em;
    }

    .grow-0 {
        flex-grow: 0;
    }

    .space-around {
        justify-content: space-around;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .outline {
        outline: thin solid red;
    }
</style>
