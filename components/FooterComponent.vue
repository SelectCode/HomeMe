<template>
    <v-row justify="end" class="grow-0">
        <SettingsDialog/>
        <!--<v-btn icon @click="reset" class="mt-2">
            <v-icon color="primary">mdi-restart</v-icon>
        </v-btn>-->
        <v-btn data-nolt="button" @click="feedback" class="nolt my-auto mt-2" id="nolt" text color="primary"
               target="_blank">
            <v-icon left>
                mdi-message-draw
            </v-icon>
            Feedback
        </v-btn>
        <v-btn text color="primary" nuxt to="/imprint" class="mt-2">Impressum</v-btn>
        <v-btn text color="primary" to="/privacy" class="mt-2">Datenschutz</v-btn>
        <v-btn icon href="https://github.com/SelectCode/HomeMe" target="_blank" class="mt-2">
            <v-icon color="primary">mdi-github</v-icon>
        </v-btn>
        <cookie-law theme="base" storageType="cookies" v-on:accept="enableTracking()" v-on:decline="disableTracking()" buttonText="Alles klar!" buttonDecline buttonDeclineText="Ohne Tracking fortfahren">
            <div slot="message">
                Wir benutzen Cookies, um die Nutzerfreundlichkeit der Webseite zu verbessern. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu. <v-btn nuxt to="/privacy" text color="primary">Datenschutzerklärung</v-btn>
            </div></cookie-law>
        <script async src="https://cdn.nolt.io/widgets.js"></script>
    </v-row>
</template>
<script lang="ts">
    import SettingsDialog from "~/components/SettingsDialog.vue"
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            SettingsDialog
        }
    })
    export default class FooterComponent extends Vue {

        mounted() {
            this.feedback()
        }

        feedback() {
            //@ts-ignore
            window.noltQueue = window.noltQueue || [];

            //@ts-ignore
            function nolt() {
                //@ts-ignore
                noltQueue.push(arguments)
            }

            //@ts-ignore
            nolt('init', {
                url: 'https://homeme.nolt.io',
                selector: '#nolt'
            });
        }

        disableTracking() {
            this.$ga.disable();
            console.log("GA disabled")
        }

        enableTracking() {
            this.$ga.enable();
            console.log("enabled")
        }

    }
</script>
<style scoped>

    h1 {
        font-weight: 200 !important;
    }

    .grow-0 {
        flex-grow: 0;
    }

</style>
