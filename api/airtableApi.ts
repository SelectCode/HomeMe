import BreakActivity from "~/model/break";

const Airtable = require('airtable');

export default class AirtableApi {
    private base = new Airtable({apiKey: 'keyTUxBRbG7xfFFoZ'}).base('appT6532nG60e3jO8');

    public getAllBreakActivities(): BreakActivity[] {
        return [
            new BreakActivity("Pausenaktivität", "Beschreibung der Pausenaktivität", "Allein",
                ["Ruhepause"], "https://www.youtube.com/watch?v=BtN-goy9VOY", "Video")
        ];

        // If you only want the first page of records, you can
        // use `firstPage` instead of `eachPage`.
        // let result: BreakActivity[] = [];
        //
        // this.base('Pausen').select()
        // // @ts-ignore
        //     .eachPage(function (err, records) {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
        //         // @ts-ignore
        //         records.forEach(function (record) {
        //             console.log(record.get('Name'));
        //             result.push(new BreakActivity(
        //                 record.get('Name'),
        //                 record.get('Beschreibung'),
        //                 record.get('Typ'),
        //                 record.get('Kategorie'),
        //                 record.get('Content'),
        //                 record.get('Content-Typ')
        //             ));
        //         });
        //     });
        //
        // console.log(result.length);
        // console.log(JSON.stringify(result));
        // return result;
    }

}