import {IAvatarRepo} from "~/data/interface/IAvatarRepo";
import {vxm} from "~/store";
import {BreakActivity} from "~/model/BreakActivity";
import {AirtableAvatarRepo} from "~/data/airtable/AirtableAvatarRepo";

export interface IBreakActivityRecommender {
    getRecommendedBreakActivities(avatarId: string): BreakActivity[];
}

export class BreakActivityRecommender implements IBreakActivityRecommender {

    private avatarRepo: IAvatarRepo = new AirtableAvatarRepo();

    getRecommendedBreakActivities(avatarId: string): BreakActivity[] {
        let avatar = this.avatarRepo.getAvatarById(avatarId);
        if (avatar == undefined) {
            return [];
        }

        let allBreakActivities = vxm.breaks.breakActivities;
        let possibleTypes: string[] = avatar.types;
        let possibleCategories: string[] = avatar.categories;

        this.shuffle(allBreakActivities);

        return allBreakActivities
            // Filter for type
            .filter((it) => possibleTypes.some(it => possibleTypes.includes(it)))
            // Filter for category
            .filter((it) => it.category.every((it) => possibleCategories.includes(it)))
            .slice(0, 3);
    }

    shuffle(array: any) {
        array.sort(() => Math.random() - 0.5);
    }

}

