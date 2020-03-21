<template>
    <v-layout row>
        <v-card class="ma-2">
            <v-card-title class="display-1">
                Pause
            </v-card-title>
            <v-card-text class="subtitle-1 font-weight-light">
                Gönn dir!
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="stopBreak" class="mb-2" large>
                    Stop now
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import {vxm} from '~/store'

    @Component({components: {Logo}})
    export default class Break extends Vue {

        get user() {
            return vxm.user;
        }

        stopBreak(){
            vxm.user.stopBreak();
        }

        get break() {
            return {
                title: "Option A",
                id: 0,
                description: 'Tu das'
            }
        }


    }
</script>

<style scoped>

</style>
