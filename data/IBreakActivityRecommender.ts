import {BreakActivity} from "~/data/IBreakActivityRepo";
import {Avatar} from "~/data/IAvatarRepo";

export interface IBreakActivityRecommender {
    getRecommendedBreakActivities(avatar: Avatar, activities: BreakActivity[]): Promise<BreakActivity[]>;
}

export class BreakActivityRecommender implements IBreakActivityRecommender {

    async getRecommendedBreakActivities(avatar: Avatar, activities: BreakActivity[]): Promise<BreakActivity[]> {
        let possibleTypes: string[] = avatar.types;
        let possibleCategories: string[] = avatar.categories;

        this.shuffle(activities);

        return activities
            // Filter for type
            .filter((it) => possibleTypes.includes(it.type))
            // Filter for category
            .filter((it) => it.category.every((it) => possibleCategories.includes(it)))
            .slice(0, 3);
    }

    shuffle(array: any) {
        array.sort(() => Math.random() - 0.5);
    }

}

