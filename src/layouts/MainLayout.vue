<template>
  <q-layout view="hHh lpR lFr">
    <q-header
      bordered
      class="bg-white text-black"
      elevated
    >
      <Toolbar
        @toolbar_button="miniLeft=!miniLeft"
      />
    </q-header>
    <!--    LEFT DRAWER-->
    <q-drawer
      v-model="left"
      :mini="miniLeft"
      :width="333"
      show-if-above
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <MiniListItemUsersView
        v-if="miniLeft"
        @talk_selected="left=!left"
      />
      <GroupUsersView
        v-else
        @talk_selected="left=!left"
      />
    </q-drawer>
    <!--    RIGHT DRAWER-->
    <q-drawer
      v-model="right"
      side="right"
      overlay
      behavior="mobile"
      elevated
      content-class="bg-grey-2"
    >
      <q-input
        class="q-ma-md"
        outlined
        rounded
        placeholder="Search Qwitter"
        dense
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <UserSelect />
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import MiniListItemUsersView from 'layouts/Main/MiniListItemUsersView'
import Toolbar from 'layouts/Main/Toolbar'
import GroupUsersView from 'layouts/Main/GroupUsersView'
import db from 'boot/firebase'
import { User } from 'src/models/User'
import UserSelect from 'layouts/Main/RightDrawer/UserSelect'

export default {
    components: {UserSelect, GroupUsersView, Toolbar, MiniListItemUsersView},
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

        db.collection('users')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let data = change.doc.data()

                    data.groups[0].userGroup = {new_messages:1}
                    console.log(data)
                    User.insertOrUpdate({data: data})

                })
            })

        document.addEventListener('keydown', this.keyListener)
    },

    methods: {
        closeTalk(talkId) {
            this.$store.commit('messages/deleteOpenedTalkState', talkId)
        },

        openTalk(id) {
            this.$store.commit('messages/ADD_OPENED_TALK', id)
        },

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
        },

        debug() {
            console.log('asdf')
        }
    },
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
