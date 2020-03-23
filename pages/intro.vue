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
            <v-row class="justify-center align-center" v-if="savedUsername === ''">
                <v-text-field class="namefield" autofocus v-model="username" hint="Name"/>
                <v-btn outlined class="ml-3" @click="setName">OK</v-btn>
            </v-row>
            <v-row v-else>
                <v-progress-linear :value="progress"/>
            </v-row>
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

        get savedUsername() {
            return this.user.name;
        }

        setName() {
            vxm.user.changeName(this.username);
            this.$root.$emit('chat', 'Hi ' + this.username + '. Schön dich kennenzulernen!');
            setInterval(() => this.progress++, 230);

            setTimeout(() => this.speak(
                'Ich werde dir helfen dein Home Office effektiver und angenehmer zu gestalten.'
            ), 3000)
            setTimeout(() => this.speak(
                'Wähle deinen Lieblingsavatar aus auf der linken Seite aus.'
            ), 7000)
            setTimeout(() => this.speak(
                'Damit werden die Pausenvorschläge an deine Wünsche angepasst.'
            ), 12000)
            setTimeout(() => this.speak(
                'Ich freue mich auf unsere gemeinsame Zeit!'
            ), 16000)
            setTimeout(() => this.speak(
                'Los gehts!'
            ), 20000)
            setTimeout(() => this.$router.push('/'), 23000)
        }

        speak(text: string) {
            this.$root.$emit('chat', text)
        }

        progress = 0;

        username = ''

        reset() {
            this.user.reset()
        }

        mounted() {
            if (vxm.user.name !== '') {
                this.$router.push('/')
            }
            this.$root.$emit('chat', 'Willkommen! Mein Name ist Peter. Wie heißt du?')
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

    .namefield {
        max-width: 30vw;
        font-size: 2em;
        font-weight: lighter;
    }
</style>
