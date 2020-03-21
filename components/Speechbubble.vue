<template>
    <span class="bubble pa-2" v-if="text !== ''">
        {{text}}
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'

    @Component({components: {Logo}})
    export default class Speechbubble extends Vue {

        @Prop()
        avatar!: string;

        text = 'Willkommen!';

        mounted() {
            this.$root.$on('chat', this.showText)
        }

        showText(text: string) {
            this.text = text;
        }

    }
</script>

<style scoped>

    .bubble {
        position: relative;
        width: 250px;
        height: 120px;
        padding: 0px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        border: #D6D2D2 solid 5px;
        font-size: 1.25em;

    }

    .bubble:before {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 27px 27px 27px 0;
        border-color: transparent #D6D2D2;
        display: block;
        width: 0;
        z-index: 0;
        left: -30px;
        top: 33px;
    }
</style>
