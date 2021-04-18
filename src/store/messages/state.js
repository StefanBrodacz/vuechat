let openedTalks = [
    {
        alias: 'MAIN',
        id: 0
    },
    {
        alias: 'Morgan',
        id: 1
    },
    {
        alias: 'Burns',
        id: 2
    },
    {
        alias: 'Campos',
        id: 3
    },
    {
        alias: 'Theresa',
        id: 4
    }
]
export default function () {
    return {
        openedTalks: openedTalks,
        qweets: [],
        activeTalk:  0
    }
}
