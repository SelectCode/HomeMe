import {action, createModule, mutation} from "vuex-class-component";
import {event} from 'vue-analytics'
import {AvatarText} from "~/model/AvatarText";
import {Avatar} from "~/model/Avatar";
import {AirtableAvatarRepo} from "~/data/airtable/AirtableAvatarRepo";
import {AirtableAvatarTextRepo} from "~/data/airtable/AirtableAvatarTextRepo";

const AvatarModule = createModule({
    namespaced: "avatar",
    strict: false,
    target: "nuxt",
});

declare var $nuxt: any;

export class AvatarStore extends AvatarModule {
    avatar = 'parrot';
    avatarTexts: AvatarText[] = [];
    avatars: Avatar[] = [];

    @mutation
    setAvatar(avatarId: string) {
        this.avatar = avatarId;
        event('avatar', 'change', avatarId)
    }

    @action
    async loadData() {
        await Promise.all([this.loadAvatars(), this.loadAvatarTexts()]);
    }

    @action
    private async loadAvatarTexts() {
        let texts = await new AirtableAvatarTextRepo().getAvatarTexts($nuxt.$axios);
        this.setAvatarTexts(texts);
        console.log("loaded avatar texts " + this.avatarTexts.length);
    }

    @mutation
    private setAvatars(avatars: Avatar[]) {
        this.avatars = avatars;
    }

    @mutation
    private setAvatarTexts(texts: AvatarText[]) {
        this.avatarTexts = texts;
    }

    @action
    private async loadAvatars() {
        let avatars = await new AirtableAvatarRepo().getAvatars($nuxt.$axios);
        this.setAvatars(avatars);
        console.log("loaded avatars : " + this.avatars.length);
    }
}

