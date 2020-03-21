export interface IAvatarRepo {
    getAvatars(): Avatar[]
}

export class MockAvatarImpl implements IAvatarRepo {
    getAvatars(): Avatar[] {
        return [
            {
                name: 'Gepard',
                id: 'cheetah',
                image: 'https://image.flaticon.com/icons/svg/1998/1998597.svg',
                description: 'Hi, ich bin der Gepard. Meine Aufgabe ist es, Dich heute während deines Home Offices fit zu halten. Dabei gebe ich Dir immer wieder Anregungen, Dich zu bewegen. Wie wäre es mit einigen Burpees oder Dehnen? Wähl’ mich, um fit zu bleiben.'
            },
            {
                name: 'Hund',
                id: 'dog',
                image: 'https://image.flaticon.com/icons/svg/616/616574.svg',
                description: "Hi, ich bin der Hund. Meine Aufgabe ist es, Dich heute während deines Home Offices Dich up to date zu halten. Dabei gebe ich Dir immer wieder wichtige Erinnerungen, während Du in Deine Arbeit vertieft bist. Du wolltest heute noch Mama zurückrufen, vergiss das nicht! Wähl’ mich, um nichts zu verpassen."
            },
            {
                name: 'Schmetterling',
                id: 'butterfly',
                image: 'https://image.flaticon.com/icons/svg/616/616574.svg',
                description: "Hi, ich bin der Schmetterling. Meine Aufgabe ist es, Dich heute während deines Home Offices kreativ zu unterstützen. Dabei gebe ich Dir immer wieder intellektuelle Anregungen. Wie wäre es mit inspirierenden Sounds oder einer spannenden Kurzgeschichte? Wähl’ mich, um kreativ zu bleiben."
            },
            {
                name: 'Papagei',
                id: 'parrot',
                image: 'https://image.flaticon.com/icons/svg/616/616574.svg',
                description: "Hi, ich bin der Papagei. Meine Aufgabe ist es Dich heute während deines Home Offices zu unterhalten. Dabei hörst Du immer wieder lustige Sprüche von mir. Wusstest Du, dass man in Deutschland gar kein Recht auf Home Office hat? Wähl’ mich damit Du Spaß bei der Arbeit zu haben."
            },
            {
                name: 'Schildkröte',
                id: 'turtle',
                image: '',
                description: 'Hi, ich bin die Schildkröte. Meine Aufgabe ist es, Dich heute während deines Home Offices geistig fit zu halten. Dabei gebe ich Dir immer wieder Anregungen, die Dich zum Nachdenken und Entspannen bringen. Wie wäre es mit einer Runde Sudoku oder etwas Meditation? Wähl’ mich, um entspannt zu bleiben.'
            }
        ];
    }
}


export interface Avatar {
    name: string,
    description: string,
    image: string,
    id: string
}
