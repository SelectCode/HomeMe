import {AvatarText} from "~/model/AvatarText";

export interface IAvatarTextRepo {
    getAvatarTexts(): Promise<AvatarText[]>;
}

