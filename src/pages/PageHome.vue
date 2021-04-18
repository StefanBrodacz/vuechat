<template>
  <q-page>
    <q-tab-panels
      v-model="activeTalk"
      keep-alive
      transition-prev="jump-up"
      transition-next="jump-down"
      animated
      infinite
      :swipeable="$q.platform.is.mobile"
    >
      <q-tab-panel
        v-for="talk in openedTalks"
        :key="`panel-${talk.id}`"
        :name="talk.id"
        class="q-pa-none q-ma-none column"
        style="height: 92vh"
      >
        <MessageInput
          :talk="talk"
        />
        <q-scroll-area class="col">
          <component
            :is="messageListComponent"
            :talk="talk"
          />
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>

import db from 'boot/firebase'
import MessageInput from 'components/Talks/MessageInput'
import Diminish from 'components/Talks/MessagesList/Diminish'
import MessagesList from 'components/Talks/MessagesList'
import { Talk } from 'src/models/Talks'
import TimelineMessages from 'components/Talks/TimelineMessages'
import { User } from 'src/models/User'

export default {
    name: 'PageHome',
    components: {TimelineMessages, MessagesList, Diminish, MessageInput},
    data() {
        return {
            qweets: [],
            randomString() {
                return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }
        }
    },

    computed: {
        messageListComponent() {
            if (this.$q.platform.is.mobile) {
                switch (this.$store.state.settings.messagesList.mobileValue) {
                case 'Standard':
                    return 'TimelineMessages'
                case 'Diminish':
                    return 'Diminish'
                case 'MessagesList':
                    return 'MessagesList'
                }
            } else {
                switch (this.$store.state.settings.messagesList.desktopValue) {
                case 'Standard':
                    return 'MessagesList'
                case 'Diminish':
                    return 'Diminish'
                case 'TimelineMessages':
                    return 'TimelineMessages'
                }
            }
            return 'MessagesList'
        },

        activeTalk: {
            get() {
                let talks = Talk.query().where('active', true).get()
                return talks.length > 0 ? talks[0].id : null
                // return this.$store.state.messages.activeTalk
            },

            set(val) {
                Talk.update({where: (talk) => talk.active === true, data: {'active': false}})
                Talk.update({where: val, data: {'active': true}})
                // this.$store.commit('messages/SET_ACTIVE_TALK', val)
            }
        },

        openedTalks() {
            return Talk.query().where('show', true).with('participants').get()
            // return this.$store.state.messages.openedTalks
        },

        me() {
            return this.$store.state.users.me
        }
    },

    mounted() {

        db.collection('users').doc(this.me).get().then((doc) => {
            if (doc.exists) {
                User.insertOrUpdate({data: doc.data()})

                db.collection('qweets').where('participants', 'array-contains', this.$store.state.users.me).orderBy('date')
                    // .where('state', '==', 'CA')
                    .onSnapshot((snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            let changed = change.doc.data()
                            changed.id = change.doc.id
                            if (change.type === 'added') {
                                if (!changed.seen.find((seen) => {

                                    return seen.who === this.me
                                })) {
                                    this.$q.notify('New Message')

                                    Talk.update({where: changed.talkId, data: {new_messages: 1}})

                                }
                                // let qweetDoc = db.collection('qweets').doc(changed.id)
                                // qweetDoc.update({
                                //     seen: []
                                // })
                                //     .then(() => {
                                //         console.log('Document successfully updated!')
                                //     })
                                //     .catch((error) => {
                                //         // The document probably doesn't exist.
                                //         console.error('Error updating document: ', error)
                                //     })

                                // this.qweets.unshift(changed)
                                this.$store.commit('messages/addQweetsState', changed)
                            }
                            if (change.type === 'modified') {
                                console.log('modified')
                                // let index = this.qweets.findIndex(qweet => qweet.id === changed.id)
                                // Object.assign(this.qweets[index], changed)
                                this.$store.commit('messages/changeQweetState', changed)
                            }
                            if (change.type === 'removed') {
                                // let index = this.qweets.findIndex(qweet => qweet.id === changed.id)
                                // this.qweets.splice(index, 1)
                                this.$store.commit('messages/deleteQweetState', changed)
                            }
                        })
                    })
            } else {
                console.log('user not exists ', this.me)
            }
        }).catch((err) => {
            console.log('Error fetching doc: ', err)
        })

    },


}
</script>
<style lang="sass">
.qweet:not(:first-child)
    border-top: 1px solid rgba(0, 0, 0, 0.12)

.new-qweet
    textarea
        font-size: 19px
        line-height: 1.4 !important

.divider
    border-top: 1px solid
    border-bottom: 1px solid
    border-color: $grey-4

.qweet-content
    white-space: pre-line

.qweet-icons
    margin-left: -5px

.qweet-tab
    flex-direction: row

.maxheight
    display: flex
</style>
