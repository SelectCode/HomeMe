// @ts-ignore
import {AirtableBaseFactory} from "~/data/AirtableBaseFactory";

export interface IAvatarTextRepo {
    getAvatarTexts(): Promise<AvatarText[]>;
}

export class AvatarTextRepo implements IAvatarTextRepo {
    private base = AirtableBaseFactory.getAirtableBase();

    async getAvatarTexts(): Promise<AvatarText[]> {
        let records = await this.base('Begleiter Texte').select().all();

        // @ts-ignore
        return records.map((record) => {
                return new AvatarText(
                    record.get('Text'),
                    record.get('Begleiter'),
                    record.get('Labels')
                );
            }
        );
    }
}

export class AvatarText {
    text: string;
    avatars: string[];
    labels: string[];

    constructor(text: string, avatars: string[], labels: string[]) {
        this.text = text;
        this.avatars = avatars;
        this.labels = labels;
    }
}