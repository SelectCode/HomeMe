export default class Break {
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