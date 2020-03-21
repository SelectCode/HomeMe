<template>
    <v-app dark>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="miniVariant"
                :clipped="true"
                fixed
                app>
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
        </v-navigation-drawer>
        <v-app-bar
                :clipped-left="true"
                fixed
                app>
            <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant">
                <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"/>
            <v-spacer/>
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
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
                icon: 'mdi-apps',
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
