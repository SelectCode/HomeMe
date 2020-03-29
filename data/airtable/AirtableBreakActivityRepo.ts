import {BreakActivity} from "~/model/BreakActivity";
import {IBreakActivityRepo} from "~/data/interface/IBreakActivityRepo";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

export class AirtableBreakActivityRepo implements IBreakActivityRepo {
    async getBreakActivities(axios: NuxtAxiosInstance): Promise<BreakActivity[]> {
        let records = (await axios.$get('https://home-me-airtable.selectcode.workers.dev/Pausen')).records;
        return records.map((record: any) => ({
            id: record.fields.ID,
            name: record.fields.Name,
            description: record.fields.Beschreibung,
            type: record.fields.Typ,
            category: record.fields.Kategorien,
            content: record.fields.Content,
            contentType: record.fields['Content-Typ'],
            imageUrl: record.fields.HeaderImage,
            duration: record.fields.DauerInMinuten
        }))
    }
}
