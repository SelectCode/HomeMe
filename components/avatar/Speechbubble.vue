<template>
    <div>
        <span class="bubble pa-2" :class="{top: top, right: !top}" v-if="text !== ''">{{text}}</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    @Component
    export default class Speechbubble extends Vue {

        @Prop({default: false})
        top!: boolean;

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
        position: relative;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        display: flex;
        min-height: 54px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        border: #D6D2D2 solid 2px;
        font-size: 1.5em;
    }

    .bubble.right{
        margin-left: 18px;
    }

    .bubble.top{
        margin-bottom: 20px;
    }

    .bubble.right:before {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 17px 17px 17px 0;
        border-color: transparent #D6D2D2;
        display: block;
        width: 0;
        z-index: 0;
        left: -18px;
        transform: translate(0, -50%);
        top: 50%;
    }


    .bubble.top:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-top-color: #D6D2D2;
        border-bottom: 0;
        margin-left: -20px;
        margin-bottom: -20px;
    }
</style>
