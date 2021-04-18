const getters = {
    getQweets: (state) => (talkId) => {
        return state.qweets.filter(qweet => qweet.talkId === talkId)
    }
}

export default getters
