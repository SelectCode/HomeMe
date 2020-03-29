<template>
    <div>
        <F1StartWorkday v-if="showStartWorkday"/>
        <F2DuringWorkday v-if="showWorkDay"/>
        <F3ChooseBreak v-if="showChoose"/>
        <F4Break v-if="showBreak"/>
        <F5EndWorkDay v-if="showEnd"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import {UiState} from "~/store/UiState";
    import F1StartWorkday from "~/components/flow/F1StartWorkday.vue";
    import F2DuringWorkday from "~/components/flow/F2DuringWorkday.vue";
    import F3ChooseBreak from "~/components/flow/F3ChooseBreak.vue";
    import F4Break from "~/components/flow/F4Break.vue";
    import F5EndWorkDay from "~/components/flow/F5EndWorkDay.vue";
    import {AirtableAvatarTextRepo} from "~/data/airtable/AirtableAvatarTextRepo";

    @Component({components: {F1StartWorkday, F2DuringWorkday, F3ChooseBreak, F4Break, F5EndWorkDay}})
    export default class FlowComponent extends Vue {

        get showStartWorkday() {
            return vxm.state.state === UiState.BEFORE_WORK;
        }

        get showWorkDay() {
            return vxm.state.state === UiState.WORKING;
        }

        get showChoose() {
            return vxm.state.state === UiState.CHOOSE_BREAK;
        }

        get showBreak() {
            new AirtableAvatarTextRepo().getAvatarTexts();
            return vxm.state.state === UiState.BREAK;
        }

        get showEnd() {
            return vxm.state.state === UiState.AFTER_WORK;
        }

    }
</script>

<style scoped>
</style>
