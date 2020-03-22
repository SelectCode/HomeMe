<template>
    <div>
        <span class="bubble pa-2" v-if="text !== ''">{{text}}</span>
    </div>
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

    @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

    .bubble {
        font-family: 'Patrick Hand', cursive;
        margin-left: 28px;
        top: 50%;
        transform: translate(0, -50%);
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        position: relative;
        display: flex;
        width: 250px;
        height: 120px;
        padding: 0;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        border: #D6D2D2 solid 2px;
        font-size: 1.5em;

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
        left: -28px;
        top: 33px;
    }
</style>
