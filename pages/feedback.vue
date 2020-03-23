<template>
    <v-layout align-center justify-center column>
        <h2 class="display-2 text-center ma-3">Feedback & Contact 🦜</h2>
        <v-card id="contact" class="pa-2">
            <v-form name="contact"
                    data-netlify-recaptcha="true"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    class="pa-2">
                <input type="hidden" name="form-name" value="contact"/>
                <v-text-field name="name" v-model="form.name" label="Name" rounded full-width filled/>
                <v-text-field name"email" label="Email" v-model="form.email" rounded full-width filled type="email"/>
                <v-textarea name="message" label="Message" v-model="form.message" rounded full-width filled auto-grow/>
                <div data-netlify-recaptcha="true"></div>
                <v-btn @click="submit" color="primary" rounded large block>
                    Submit
                </v-btn>
            </v-form>
        </v-card>
    </v-layout>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class FeedbackComponent extends Vue {

        form = {
            name: '',
            message: '',
            email: ''
        }


        encode(data: any) {
            return Object.keys(data)
                .map(
                    key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                )
                .join("&");
        }

        async submit() {
            await this.$axios.post('https://pause.selectcode.de/',
                this.encode({
                    "form-name": "contact",
                    ...this.form
                }),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
        }
    }
</script>
<style>
    #contact {
        width: 50vw;
    }
</style>
