// @ts-ignore
import {AirtableBaseFactory} from "~/data/AirtableBaseFactory";

export interface IBreakActivityRepo {
    getBreakActivities(): Promise<BreakActivity[]>;
}

export class BreakActivityRepo implements IBreakActivityRepo {
    private base = AirtableBaseFactory.getAirtableBase();

    async getBreakActivities(): Promise<BreakActivity[]> {
        let records = await this.base('Pausen').select().all();

        // @ts-ignore
        return records.map((record) => {
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

export interface BreakActivity {
    name: string;
    description: string;
    type: string[];
    category: string[];
    content: string;
    contentType: string;
    imageUrl: string;
    duration: number;
    id: number;
}
