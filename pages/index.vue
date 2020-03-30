<template>
    <v-container>
        <v-row justify="center" class="grow-0">
            <h1 class="display-3 my-3 text-center">HomeMe</h1>
        </v-row>
        <v-row class="mt-5 flex-column grow-0">
            <v-row justify="center" class="my-5 ">
                <div class="text-center">
                    <AvatarImage :avatar="avatar"/>
                </div>
                <Speechbubble/>
            </v-row>
            <FlowComponent/>
            <MoodComponent class="justify-center mt-4"/>
        </v-row>
        <FooterComponent/>
    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from "~/store";
    import SettingsDialog from "~/components/SettingsDialog.vue";
    import AvatarImage from "~/components/avatar/AvatarImage.vue";
    import Speechbubble from "~/components/avatar/Speechbubble.vue";
    import MoodComponent from "~/components/MoodComponent.vue";
    import FlowComponent from "~/components/flow/FlowComponent.vue";
    import FooterComponent from "~/components/FooterComponent.vue";

    @Component({
        components: {
            FooterComponent,
            FlowComponent,
            MoodComponent,
            Speechbubble,
            AvatarImage,
            SettingsDialog
        },
        async asyncData(){
            await Promise.all([vxm.avatar.loadData(), vxm.breaks.loadData()]);
        }
    })
    export default class Index extends Vue {
        get user() {
            return vxm.user
        }

        get avatar() {
            return vxm.avatar.avatar;
        }

        async mounted() {
            if (vxm.user.name === '') {
                await this.$router.push('/intro')
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
