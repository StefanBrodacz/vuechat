<template>
  <q-layout view="hHh lpR lFr">
    <q-page-container>
      <q-page padding>
        <q-page-sticky
          position="bottom-right"
          offset="[18, 18]"
        >
          <q-btn
            fab
            round
            size="lg"
            color="purple"
            icon="chat"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import db from 'boot/firebase'
import { User } from 'src/models/User'

export default {
    name: 'TestLayout',
    components: {},
    data() {
        return {
            left: false,
            miniLeft: false,
            right: false
        }
    },

    computed: {
        activeTalk: {
            get() {
                return this.$store.state.messages.activeTalk
            },

            set(val) {
                this.$store.commit('messages/SET_ACTIVE_TALK', val)
            }
        },

        openedTalks() {
            return this.$store.state.messages.openedTalks
        },

        activeTalkId() {
            return this.$store.state.messages.activeTalk
        }
    },

    mounted() {
        console.log(this.$q.fullscreen.isCapable)
        db.collection('users')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    User.insertOrUpdate({data: change.doc.data()})
                })
            })

        document.addEventListener('keydown', this.keyListener)
    },

    created() {
        window.addEventListener('deviceready', this.onDeviceReady, false)
    },

    methods: {
        onDeviceReady() {
            navigator.vibrate([3000,1000,1000,3000])
        },

        closeTalk(talkId) {
            this.$store.commit('messages/deleteOpenedTalkState', talkId)
        }
        ,

        openTalk(id) {
            this.$store.commit('messages/ADD_OPENED_TALK', id)
        }
        ,

        keyListener(e) {

            if (!e.altKey) {
                if (e.key === 'ArrowLeft') {
                    let talkId = Math.max(0, this.activeTalkId - 1)
                    this.$store.commit('messages/SET_ACTIVE_TALK', talkId)
                } else if (e.key === 'ArrowRight') {
                    let talkId = Math.min(this.openedTalks.length - 1, this.activeTalkId + 1)
                    this.$store.commit('messages/SET_ACTIVE_TALK', talkId)
                }
            }
        }
        ,

        debug() {
            console.log('asdf')
        }
    }
}
</script>

<style lang="sass">
.header-icon
    position: absolute
    bottom: 0
    left: 50%
    transform: translateX(-50%)

.qweet-tab
    flex-direction: row

.q-tree__node--selected
    background-color: $primary
</style>
