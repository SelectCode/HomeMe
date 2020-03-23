<template>
    <v-img max-height="150px" contain :lazy-src="staticImage" :src="movingImage"></v-img>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    //@ts-ignore
    import Logo from '@/components/Logo'

    @Component({components: {Logo}})
    export default class StartWorkday extends Vue {

        @Prop()
        avatar!: string;

        get movingImage() {
            return '/avatar/' + this.avatar + '.gif'
        }

        get staticImage() {
            return '/avatar/' + this.avatar + '.svg'
        }

    }
</script>

<style scoped>

</style>
