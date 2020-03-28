<template>
    <v-layout column>
        <v-img :src="breakActivity.imageUrl" height="200px" :width="width"/>
        <v-card-title class="display-1">
            {{breakActivity.name}}
            <v-chip v-for="cat in breakActivity.category" outlined color="primary" small class="ml-2">
                {{cat}}
            </v-chip>
            <v-chip outlined color="primary" small class="ml-2">
                {{breakActivity.duration}} min
            </v-chip>
        </v-card-title>
        <v-card-text class="subtitle-1 font-weight-light">
            {{breakActivity.description}}
        </v-card-text>
        <v-card-actions v-if="breakActivity.contentType && showLink">
            <v-btn color="primary" target="_blank" block outlined :href="breakActivity.content">
                Besuchen
                <v-icon>
                    mdi-link
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-layout>
</template>
<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {BreakActivity} from "~/data/IBreakActivityRepo";

    @Component
    export default class BreakComponent extends Vue {

        @Prop()
        breakActivity!: BreakActivity

        @Prop({default: '100%'})
        width!: string

        @Prop({default: false})
        showLink!: boolean
    }


</script>
