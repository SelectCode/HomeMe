<template>
    <v-card>
        <v-card-title class="headline">
            Willkommen {{user.name}}
        </v-card-title>
        <v-card-actions>
            <v-btn color="primary" block @click="start">
                Start Workday
            </v-btn>
        </v-card-actions>
    </v-card>
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

        async start() {
            await vxm.user.startWorkday();
        }

    }
</script>

<style scoped>

</style>
