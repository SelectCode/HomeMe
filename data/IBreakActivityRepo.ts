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
            return new BreakActivity(
                record.get('Name'),
                record.get('Beschreibung'),
                record.get('Typ'),
                record.get('Kategorien'),
                record.get('Content'),
                record.get('Content-Typ')
            )
        });
    }
}

export class BreakActivity {
    name: string;
    description: string;
    type: string;
    category: string[];
    content: string;
    contentType: string;

    constructor(name: string, description: string, type: string, category: string[], content: string, contentType: string) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.category = category;
        this.content = content;
        this.contentType = contentType;
    }
}