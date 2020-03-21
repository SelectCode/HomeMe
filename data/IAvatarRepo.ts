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
                description: 'Hi nett dich kennenzulernen!'
            },
            {
                name: 'Hund',
                id: 'dog',
                image: 'https://image.flaticon.com/icons/svg/616/616574.svg',
                description: "huhu"
            },
            {
                name: 'Hund',
                id: 'dog',
                image: 'https://image.flaticon.com/icons/svg/616/616574.svg',
                description: "huhu"
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
