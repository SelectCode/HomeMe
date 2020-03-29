import {AirtableBaseFactory} from "~/data/airtable/AirtableBaseFactory";
import {BreakActivity} from "~/model/BreakActivity";
import {IBreakActivityRepo} from "~/data/interface/IBreakActivityRepo";

export class AirtableBreakActivityRepo implements IBreakActivityRepo {
    private base = AirtableBaseFactory.getAirtableBase();

    async getBreakActivities(): Promise<BreakActivity[]> {
        let records = await this.base('Pausen').select().all();
        return records.map((record: any) => {
            return {
                id: record.get('ID'),
                name: record.get('Name'),
                description: record.get('Beschreibung'),
                type: record.get('Typ'),
                category: record.get('Kategorien'),
                content: record.get('Content'),
                contentType: record.get('Content-Typ'),
                imageUrl: record.get('HeaderImage'),
                duration: record.get('DauerInMinuten')
            }
        });
    }
}
