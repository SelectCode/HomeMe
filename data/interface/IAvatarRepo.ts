import {Avatar} from "~/model/Avatar";

export interface IAvatarRepo {
    getAvatars(): Promise<Avatar[]>;

    getAvatarById(id: string): Avatar | undefined;
}

