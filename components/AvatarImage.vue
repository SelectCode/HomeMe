<template>
    <v-img max-height="200px" contain src="/avatar/cheetah.svg"></v-img>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'

    @Component({components: {Logo}})
    export default class StartWorkday extends Vue {

        @Prop()
        avatar!: string

    }
</script>

<style scoped>

</style>
