import {BreakActivity, BreakActivityRepo, IBreakActivityRepo} from "~/data/IBreakActivityRepo";
import {Avatar} from "~/data/IAvatarRepo";

export interface IBreakActivityRecommender {
    getRecommendedBreakActivities(avatar: Avatar): Promise<BreakActivity[]>;
}

class BreakActivityRecommender implements IBreakActivityRecommender {

    private breakActivityRepo: IBreakActivityRepo = new BreakActivityRepo();

    async getRecommendedBreakActivities(avatar: Avatar): Promise<BreakActivity[]> {
        let breakActivities: BreakActivity[] = await this.breakActivityRepo.getBreakActivities();
        let possibleTypes: string[] = avatar.tags


        return [];
    }
}

