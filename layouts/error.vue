<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <div class="text-center">
                <h1 class="display-1" v-if="error.statusCode === 404">
                    {{ pageNotFound }}
                </h1>
                <h1 class="display-1" v-else>
                    {{ otherError }}
                </h1>
                <NuxtLink class="display-1" to="/">
                    Home page
                </NuxtLink>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'empty',
        props: {
            error: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                pageNotFound: '404 Not Found',
                otherError: 'An error occurred'
            }
        },
        head() {
            const title =
                this.error.statusCode === 404 ? this.pageNotFound : this.otherError
            return {
                title
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-size: 20px;
    }
</style>
