import {vxm} from "~/store";
import {AvatarRepo} from "~/data/IAvatarRepo";
import {UiState} from "~/store/UserModule";

export interface ITextRecommender {
    getText(): string;
}

export class TextRecommender implements ITextRecommender {

    getText(): string {
        let allTexts = vxm.user.avatarTexts;
        let avatarId = vxm.user.avatar;
        let avatar = new AvatarRepo().getAvatarById(avatarId);
        let labels = this.mapStateToLabels();

        let possibleTexts = [];

        for (let aText of allTexts) {
            // @ts-ignore
            if (aText.avatars.includes(avatar.name)
                && aText.labels.some((label) => labels.includes(label))) {
                possibleTexts.push(aText.text);
            }
        }

        // @ts-ignore
        console.log(`Found ${possibleTexts.length} matching texts for avatar ${avatar.name} and state ${vxm.user.state}!`);

        let randomIndex = Math.floor(Math.random() * (possibleTexts.length));
        return possibleTexts[randomIndex];
    }

    mapStateToLabels(): string[] {
        switch (vxm.user.state) {
            case UiState.BEFORE_WORK:
                return ['PreWork'];
            case UiState.WORKING:
                return ['Random'];
            case UiState.BREAK_NEEDED:
                return ['BreakNeeded'];
            case UiState.CHOOSE_BREAK:
                return ['ChooseBreak'];
            case UiState.AFTER_WORK:
                return ['AfterWork'];
            case UiState.BREAK:
                return ['Break']
        }
    }
}
