import {AvatarText} from "~/model/AvatarText";
import {IAvatarTextRepo} from "~/data/interface/IAvatarTextRepo";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

export class AirtableAvatarTextRepo implements IAvatarTextRepo {
    async getAvatarTexts(axios: NuxtAxiosInstance): Promise<AvatarText[]> {
        let records = (await axios.$get('https://home-me-airtable.selectcode.workers.dev/BegleiterTexte')).records;
        return records.map((record: any) => ({
            text: record.fields.Text,
            avatars: record.fields.Begleiter,
            labels: record.fields.Labels
        } as AvatarText))
    }
}
