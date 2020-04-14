<template>
    <v-layout column>
        <v-dialog v-model="dialog" max-width="60vw">
            <v-card align="center" class="pa-3">
                <h1 class="display-1 mb-3">{{breakActivity.name}}
                    <v-btn icon rounded color="red" dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </h1>
                <v-img :src="breakActivity.imageUrl" max-height="60vh"/>
            </v-card>
        </v-dialog>
        <v-img :src="breakActivity.imageUrl" height="200px" :width="width" @click="dialog = true" style="cursor: pointer"/>
        <v-card-title class="display-1">
            {{breakActivity.name}}
            <v-chip v-for="cat in breakActivity.category" outlined color="primary" small class="ml-2">
                {{cat}}
            </v-chip>
            <v-chip outlined color="primary" small class="ml-2">
                {{breakActivity.duration}} min
            </v-chip>
            <v-chip outlined color="red" small class="ml-2 pl-2 pr-2">
                {{likes}}
                <v-icon small color="red">mdi-heart</v-icon>
            </v-chip>
        </v-card-title>
        <v-card-text class="subtitle-1 font-weight-light">
            {{breakActivity.description}}
        </v-card-text>
        <v-card-actions v-if="showLink">
            <v-btn color="primary" target="_blank" block outlined :href="breakActivity.content"
                   v-if="breakActivity.contentType === 'Webseite'">
                Webseite besuchen
                <v-icon>
                    mdi-link
                </v-icon>
            </v-btn>
            <v-btn color="red" target="_blank" block dark :href="breakActivity.content"
                   v-if="breakActivity.contentType === 'Video'">
                Video ansehen
                <v-icon>
                    mdi-video
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-layout>
</template>
<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {BreakActivity} from "~/model/BreakActivity";

    @Component
    export default class BreakComponent extends Vue {

        @Prop()
        breakActivity!: BreakActivity;

        @Prop({default: false})
        showLink!: boolean;

        dialog = false

        likes = 0;

        async mounted() {
            // HACKY WORKAROUND BECAUSE FIREBASE IS NOT INITIALISED DIRECTLY ON MOUNTED
            setTimeout(this.loadLikes, 200)
            console.log(this.breakActivity)
        }

        async loadLikes() {
            let collection = this.$fireStore.collection('breakFeedback');
            let doc = await collection.doc(this.breakActivity?.id.toString());
            //@ts-ignore
            this.likes = ((await doc.get()).data()).likes ?? 0
        }
    }


</script>
