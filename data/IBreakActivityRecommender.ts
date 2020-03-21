import {BreakActivity, BreakActivityRepo, IBreakActivityRepo} from "~/data/IBreakActivityRepo";
import {Avatar} from "~/data/IAvatarRepo";

export interface IBreakActivityRecommender {
    getRecommendedBreakActivities(avatar: Avatar): Promise<BreakActivity[]>;
}

export class BreakActivityRecommender implements IBreakActivityRecommender {

    private breakActivityRepo: IBreakActivityRepo = new BreakActivityRepo();

    async getRecommendedBreakActivities(avatar: Avatar): Promise<BreakActivity[]> {
        let breakActivities: BreakActivity[] = await this.breakActivityRepo.getBreakActivities();
        let possibleTypes: string[] = avatar.types;
        let possibleCategories: string[] = avatar.categories;

        return breakActivities
            // Filter for type
            .filter((it) => possibleTypes.includes(it.type))
            // Filter for category
            .filter((it) => it.category.every((it) => possibleCategories.includes(it)))
            .slice(0, 2);
    }
}

