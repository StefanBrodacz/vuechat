export const addQweetsState = (state, added) => {
    let index = state.qweets.findIndex(qweet => qweet.id === added.id)
    index > -1? Object.assign(state.qweets[index], added) : state.qweets.unshift(added)
}

export const changeQweetState = (state, changed) =>{
    let index = state.qweets.findIndex(qweet => qweet.id === changed.id)
    Object.assign(state.qweets[index], changed)
}
export const deleteQweetState = (state, changed) =>{
    let index = state.qweets.findIndex(qweet => qweet.id === changed.id)
    state.qweets.splice(index, 1)
}

export const deleteOpenedTalkState = (state, talkId) =>{
    let index = state.openedTalks.findIndex(talk => talk.id === talkId)
    if(index > -1)
        state.openedTalks.splice(index, 1)
}
export const ADD_OPENED_TALK = (state, newTalk) =>{

    let index = state.openedTalks.findIndex(talk => talk.id === newTalk.id)

    if(index === -1) {
        state.openedTalks.push({
            alias: 'name' in newTalk ? newTalk.name : newTalk.alias,
            id: newTalk.id
        })
    }
}

export const SET_ACTIVE_TALK = (state, talk) => {
    state.activeTalk = talk
}
