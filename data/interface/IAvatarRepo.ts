import {Avatar} from "~/model/Avatar";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

export interface IAvatarRepo {
    getAvatars(axios: NuxtAxiosInstance): Promise<Avatar[]>;

    getAvatarById(id: string): Avatar | undefined;
}

