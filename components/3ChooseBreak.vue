<template>
    <v-layout row>
        <v-card v-for="breakOption in breakOptions" class="ma-2">
            <v-card-title class="display-1">
                {{breakOption.title}}
            </v-card-title>
            <v-card-text class="subtitle-1 font-weight-light">
                {{breakOption.description}}
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="chooseBreak(breakOption.id)" class="mb-2" large>
                    Go
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
    export default class StartWorkday extends Vue {

        get user() {
            return vxm.user;
        }

        chooseBreak(breakId: string) {
            vxm.user.selectBreak(breakId);
        }

        get breakOptions() {
            return [
                {
                    title: "Option A",
                    id: 0,
                    description: 'Tu das'
                },
                {
                    title: "Option B",
                    id: 0,
                    description: 'Tu das'
                },
                {
                    title: "Option C",
                    id: 0,
                    description: 'Tu das'
                }

            ]
        }


    }
</script>

<style scoped>

</style>
