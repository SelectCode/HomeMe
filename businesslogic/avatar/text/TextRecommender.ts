import {vxm} from "~/store";
import {AirtableAvatarRepo} from "~/data/airtable/AirtableAvatarRepo";
import {UiState} from "~/store/UiState";
import {ITextRecommender} from "~/businesslogic/avatar/text/ITextRecommender";

export class TextRecommender implements ITextRecommender {

    getText(): string {
        let allTexts = vxm.avatar.avatarTexts;
        let avatarId = vxm.avatar.avatar;
        let avatar = new AirtableAvatarRepo().getAvatarById(avatarId);
        let labels = this.mapStateToLabels();
        let possibleTexts = [];

        possibleTexts = allTexts.filter(value => {
            if (!value.avatars || !value.labels) {
                return false;
            }
            return value.avatars.includes(avatar!.name) && value.labels.some((label) => labels.includes(label));
        });

        // @ts-ignore
        console.log(`Found ${possibleTexts.length} matching texts for avatar ${avatar.name} and state ${vxm.state.state}!`);

        let randomIndex = Math.floor(Math.random() * (possibleTexts.length));
        return possibleTexts[randomIndex].text;
    }

    mapStateToLabels(): string[] {
        switch (vxm.state.state) {
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
