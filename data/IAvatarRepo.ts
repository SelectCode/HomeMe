import {AirtableBaseFactory} from "~/data/AirtableBaseFactory";

export interface IAvatarRepo {
    getAvatars(): Promise<Avatar[]>
}

export class AvatarRepo implements IAvatarRepo {

    private base = AirtableBaseFactory.getAirtableBase();

    async getAvatars(): Promise<Avatar[]> {
        let records = await this.base('Begleiter').select().all();

        // @ts-ignore
        return records.map((record) => {
                return new Avatar(
                    record.get('ID'),
                    record.get('Name'),
                    record.get('Kategorien'),
                    record.get('Typ'),
                    record.get('Introduction'),
                    record.get('Tags')
                )
            }
        );
    }

    async getById(id: string): Promise<Avatar | undefined> {
        let avatars = await this.getAvatars();
        return avatars.find((it) => it.id === id);
    }
}

export class Avatar {
    id: string;
    name: string;
    categories: string[];
    types: string[];
    introduction: string;
    tags: string[];

    constructor(id: string, name: string, categories: string[], types: string[], introduction: string, tags: string[]) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.types = types;
        this.introduction = introduction;
        this.tags = tags;
    }
}
