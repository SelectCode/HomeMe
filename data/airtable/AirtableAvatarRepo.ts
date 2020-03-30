import {Avatar} from "~/model/Avatar";
import {vxm} from "~/store";
import {IAvatarRepo} from "~/data/interface/IAvatarRepo";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

export class AirtableAvatarRepo implements IAvatarRepo {
    async getAvatars(axios: NuxtAxiosInstance): Promise<Avatar[]> {
        let records = (await axios.$get('https://home-me-airtable.selectcode.workers.dev/Begleiter')).records;
        return records.map((record: any) => ({
            id: record.fields.ID,
            name: record.fields.Name,
            categories: record.fields.Kategorien,
            types: record.fields.Typ,
            introduction: record.fields.Introduction,
            tags: record.fields.Tags
        } as Avatar))
    }

    getAvatarById(id: string) {
        return vxm.avatar.avatars.find((it) => it.id === id);
    }
}
