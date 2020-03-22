<template>
    <div>
        <v-img :src="breakActivity.content" v-if="breakActivity.contentType === 'Bild'" height="200px"/>
        <v-card-title class="display-1">
            {{breakActivity.name}}
            <v-chip v-for="cat in breakActivity.category" outlined color="primary" small class="ml-2">
                {{cat}}
            </v-chip>
        </v-card-title>
        <v-card-text class="subtitle-1 font-weight-light">
            {{breakActivity.description}}
        </v-card-text>
    </div>
</template>
<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {BreakActivity} from "~/data/IBreakActivityRepo";

    @Component
    export default class BreakComponent extends Vue {

        @Prop()
        breakActivity!: BreakActivity
    }


</script>
