import {AvatarText} from "~/model/AvatarText";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

export interface IAvatarTextRepo {
    getAvatarTexts(axios: NuxtAxiosInstance): Promise<AvatarText[]>;
}

