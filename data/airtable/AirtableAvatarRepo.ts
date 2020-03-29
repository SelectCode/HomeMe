import {AirtableBaseFactory} from "~/data/airtable/AirtableBaseFactory";
import {Avatar} from "~/model/Avatar";
import {vxm} from "~/store";
import {IAvatarRepo} from "~/data/interface/IAvatarRepo";

export class AirtableAvatarRepo implements IAvatarRepo {

    private base = AirtableBaseFactory.getAirtableBase();

    async getAvatars(): Promise<Avatar[]> {
        let records = await this.base('Begleiter').select().all();
        return records.map((record: any) => {
                return {
                    id: record.get('ID'),
                    name: record.get('Name'),
                    category: record.get('Kategorien'),
                    type: record.get('Typ'),
                    introduction: record.get('Introduction'),
                    tags: record.get('Tags')
                }
            }
        );
    }

    getAvatarById(id: string) {
        return vxm.avatar.avatars.find((it) => it.id === id);
    }
}
