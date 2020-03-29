<template>
    <Component :is="component"/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {vxm} from '~/store'
    import F1StartWorkday from "~/components/flow/F1StartWorkday.vue";
    import F2DuringWorkday from "~/components/flow/F2DuringWorkday.vue";
    import F3ChooseBreak from "~/components/flow/F3ChooseBreak.vue";
    import F4Break from "~/components/flow/F4Break.vue";
    import F5EndWorkDay from "~/components/flow/F5EndWorkDay.vue";
    import {UiState} from "~/store/UiState";

    @Component({components: {F1StartWorkday, F2DuringWorkday, F3ChooseBreak, F4Break, F5EndWorkDay}})
    export default class FlowComponent extends Vue {
        get component() {
            switch (vxm.state.state) {
                case UiState.BEFORE_WORK:
                    return F1StartWorkday;
                case UiState.WORKING:
                    return F2DuringWorkday;
                case UiState.CHOOSE_BREAK:
                    return F3ChooseBreak;
                case UiState.BREAK:
                    return F4Break;
                case UiState.AFTER_WORK:
                    return F5EndWorkDay;
                case UiState.BREAK_NEEDED:
                    return F1StartWorkday;
            }
        }
    }
</script>

<style scoped>
</style>
