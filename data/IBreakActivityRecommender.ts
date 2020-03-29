import {BreakActivity} from "~/data/IBreakActivityRepo";
import {AvatarRepo, IAvatarRepo} from "~/data/IAvatarRepo";
import {vxm} from "~/store";

export interface IBreakActivityRecommender {
    getRecommendedBreakActivities(avatarId: string): BreakActivity[];
}

export class BreakActivityRecommender implements IBreakActivityRecommender {

    private avatarRepo: IAvatarRepo = new AvatarRepo();

    getRecommendedBreakActivities(avatarId: string): BreakActivity[] {
        let avatar = this.avatarRepo.getAvatarById(avatarId);
        if (avatar == undefined) {
            return [];
        }

        let allBreakActivities = vxm.user.breakActivities;
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

