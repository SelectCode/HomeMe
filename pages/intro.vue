<template>
    <v-container fluid class="justify-space-between d-flex flex-column">
        <v-row justify="center" class="grow-0">
            <h1 class="display-3 my-3 text-center">HomeMe</h1>
        </v-row>
        <v-row class="mt-5" justify="center">
            <v-col cols="12" xl="2" md="4" align-self="center" order-md="1" order="2" >
                <AvatarImage :avatar="avatar"/>
            </v-col>
            <v-col align-self="center" cols="12" xl="4" md="6" order-md="2" order="1" >
                <Speechbubble :top="$vuetify.breakpoint.smAndDown"/>
            </v-col>
        </v-row>
        <v-row class="mt-5" align-content="center" justify="center">
            <v-col cols="12" xl="6" md="8" v-if="savedUsername === ''" align-self="center" class="d-flex align-center">
                    <v-text-field class="namefield flex-grow" autofocus v-model="username" hint="Name" />
                    <v-btn outlined class="ml-3" @click="setName">OK</v-btn>
            </v-col>
            <v-col v-else cols="12">
                <v-progress-linear :value="progress"/>
            </v-col>
        </v-row>
        <FooterComponent/>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import {vxm} from "~/store";
    import Speechbubble from "~/components/avatar/Speechbubble.vue";
    import MoodComponent from "~/components/MoodComponent.vue";
    import AvatarImage from "~/components/avatar/AvatarImage.vue";
    import FooterComponent from "~/components/FooterComponent.vue";

    @Component({
        components: {
            FooterComponent,
            AvatarImage,
            MoodComponent,
            Speechbubble,
        },
        async asyncData() {
            await Promise.all([vxm.avatar.loadData(), vxm.breaks.loadData()]);
        }
    })
    export default class Intro extends Vue {

        get user() {
            return vxm.user
        }

        get savedUsername() {
            return this.user.name;
        }

        get avatar() {
            return vxm.avatar.avatar;
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

        username = '';

        async mounted() {
            if (vxm.user.name !== '') {
                await this.$router.push('/')
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

    .grow-1

    .space-around {
        justify-content: space-around;
    }

    .outline {
        outline: thin solid red;
    }

    .namefield {
        font-size: 2em;
        font-weight: lighter;
    }
</style>
