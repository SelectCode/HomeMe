<template>
    <v-app dark>
        <v-navigation-drawer v-if="$vuetify.breakpoint.mdAndUp" expand-on-hover fixed app permanent>
            <v-layout column justify-center fill-height>
                <v-list>
                    <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :to="item.to"
                            router
                            exact>
                        <v-list-item-action>
                            <v-icon color="primary">{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-layout>
            <v-footer inset absolute tile color="transparent">
                <span id="footer">&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </v-navigation-drawer>

        <v-content>
            <v-layout fill-height>
                <nuxt/>
            </v-layout>
        </v-content>

        <v-bottom-navigation v-if="$vuetify.breakpoint.smAndDown" fixed height="4em" shift>
            <v-btn v-for="(item, i) in items"
                   :key="i"
                   :to="item.to"
                   router
                   exact>
                <span>{{item.title}}</span>
                <v-icon color="primary">{{item.icon}}</v-icon>
            </v-btn>
        </v-bottom-navigation>

    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class layout extends Vue {

        items = [
            {
                icon: 'mdi-home-circle',
                title: 'Startseite',
                to: '/'
            },
            {
                icon: 'mdi-tooltip-account',
                title: 'Avatare',
                to: '/avatars'
            },
            {
                icon: 'mdi-information-outline',
                title: 'Über uns',
                to: '/about'
            }
        ];

        title = 'HomeMe 🏡'
    }

</script>

<style lang="scss">
    .display-1 {
        font-weight: 300 !important;
    }

    #footer {
        font-weight: lighter;
        font-size: small;
    }
</style>
