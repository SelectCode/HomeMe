<template>
    <v-layout column justify-center align-center>
        <v-card-title class="display-2">HomeMe</v-card-title>
        <v-flex>
            <div class="text-center">
                <AvatarImage/>
            </div>
            <StartWorkday v-if="!user.isWorkingNow"/>
            <DuringWorkday v-else/>
        </v-flex>
        <SettingsDialog/>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'
    import StartWorkday from "~/components/StartWorkday.vue";
    import {vxm} from "~/store";
    import DuringWorkday from "~/components/DuringWorkday.vue";
    import SettingsDialog from "~/components/SettingsDialog.vue";
    import AvatarImage from "~/components/AvatarImage.vue";

    @Component({components: {AvatarImage, DuringWorkday, StartWorkday, Logo, SettingsDialog}})
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }
    }

</script>
