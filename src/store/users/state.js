
const dummyUsersTree = [
    {
        id: 0,
        label: 'MAIN',
        caption: 'some story about this group',
        children:
            [
                {
                    id: 1,
                    label: 'Morgan',
                    avatar: 'https://robohash.org/Melendez',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Morgan Melendez'
                        },
                    ]
                },
                {
                    id: 2,
                    label: 'Burns',
                    avatar: 'https://robohash.org/Burns',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Jesse Burns'
                        },
                    ]
                },
                {
                    id: 3,
                    label: 'Campos',
                    avatar: 'https://robohash.org/Campos',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Veronica Campos'
                        },
                    ]
                },
                {
                    id: 4,
                    label: 'Theresa',
                    avatar: 'https://robohash.org/Theresa',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Theresa Hebert'
                        },
                    ]
                },
                {
                    id: 5,
                    label: 'Nikita',
                    avatar: 'https://robohash.org/Nikita',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Nikita Kuzmin'
                        },
                    ]
                },
                {
                    id: 6,
                    label: 'Slavik',
                    avatar: 'https://robohash.org/Slavik',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Slavik Baranov'
                        },
                    ]
                },
                {
                    id: 7,
                    label: 'Romanova',
                    avatar: 'https://robohash.org/Romanova',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Gavriila Romanova'
                        },
                    ]
                },
                {
                    id: 8,
                    label: 'Irina',
                    avatar: 'https://robohash.org/Irina',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Irina Petrova'
                        },
                    ]
                },
                {
                    id: 9,
                    label: 'Yegor',
                    avatar: 'https://robohash.org/Yegor',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Yegor Baranov'
                        },
                    ]
                }
            ]
    },
    {
        id: 2,
        label: 'GROUP2',
        caption: 'some story about this group',
        children:
            [
                {
                    id: 11,
                    label: 'Morgan',
                    avatar: 'https://robohash.org/Melendez',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Morgan Melendez'
                        },
                    ]
                },
                {
                    id: 12,
                    label: 'Burns',
                    avatar: 'https://robohash.org/Burns',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Jesse Burns'
                        },
                    ]
                },
                {
                    id: 13,
                    label: 'Campos',
                    avatar: 'https://robohash.org/Campos',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Veronica Campos'
                        },
                    ]
                },
                {
                    id: 14,
                    label: 'Theresa',
                    avatar: 'https://robohash.org/Theresa',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Theresa Hebert'
                        },
                    ]
                },
            ]
    },
    {
        id: 3,
        label: 'ZNAJOMI',
        caption: 'some story about this group',
        children:
            [
                {
                    id: 21,
                    label: 'Morgan',
                    avatar: 'https://robohash.org/Melendez',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Morgan Melendez'
                        },
                    ]
                },
                {
                    id: 32,
                    label: 'Burns',
                    avatar: 'https://robohash.org/Burns',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Jesse Burns'
                        },
                    ]
                },
                {
                    id: 43,
                    label: 'Campos',
                    avatar: 'https://robohash.org/Campos',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Veronica Campos'
                        },
                    ]
                },
                {
                    id: 54,
                    label: 'Theresa',
                    avatar: 'https://robohash.org/Theresa',
                    children: [
                        {
                            label: 'Full Name',
                            story: 'Theresa Hebert'
                        },
                    ]
                },
            ]
    }
]
const dummyExpanded = [0]
export default function () {
    return {
        usersTree: dummyUsersTree,
        expanded: dummyExpanded,
        selected: null,
        ticked: [],
        //me: 'df982a1a-6ad3-45dc-82c9-5bb0c0c63db1' //irina
        me: '261bad16-5307-473f-94f8-c5919d27a3ee' //morgan
    }
}

