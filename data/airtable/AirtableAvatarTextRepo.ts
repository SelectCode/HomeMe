import {AirtableBaseFactory} from "~/data/airtable/AirtableBaseFactory";
import {AvatarText} from "~/model/AvatarText";
import {IAvatarTextRepo} from "~/data/interface/IAvatarTextRepo";

export class AirtableAvatarTextRepo implements IAvatarTextRepo {
    private base = AirtableBaseFactory.getAirtableBase();

    async getAvatarTexts(): Promise<AvatarText[]> {
        let records = await this.base('Begleiter Texte').select().all();
        return records.map((record: any) => ({
                text: record.get('Text'),
                avatars: record.get('Begleiter'),
                labels: record.get('Labels')
            })
        );
    }
}
