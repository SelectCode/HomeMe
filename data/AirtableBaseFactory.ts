const Airtable = require('airtable');

export class AirtableBaseFactory {

    public static getAirtableBase() {
        return new Airtable({apiKey: 'keyTUxBRbG7xfFFoZ'}).base('appT6532nG60e3jO8');
    }
}
