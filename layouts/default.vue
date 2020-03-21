<template>
    <v-app dark>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="miniVariant"
                :clipped="true"
                expand-on-hover
                fixed
                app>
            <v-layout column justify-center fill-height>
                <v-list>
                    <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :to="item.to"
                            router
                            exact>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-layout>
        </v-navigation-drawer>

        <v-content>
            <v-layout fill-height>
                <nuxt/>
            </v-layout>
        </v-content>
        <v-footer
                :fixed="fixed"
                app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
            <v-spacer/>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class layout extends Vue {
        drawer = true
        fixed = false
        items = [
            {
                icon: 'mdi-home-circle',
                title: 'Welcome',
                to: '/'
            },
            {
                icon: 'mdi-account-box',
                title: 'Avatars',
                to: '/avatars'
            },
            {
                icon: 'mdi-chart-bubble',
                title: 'About',
                to: '/about'
            }
        ]
        miniVariant = true
        right = true

        rightDrawer = false

        title = 'HomeMe 🏡'
    }
</script>
