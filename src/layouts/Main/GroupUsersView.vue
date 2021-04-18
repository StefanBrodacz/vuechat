<template>
  <q-scroll-area class="full-height full-width ">
    <q-list dense>
      <q-expansion-item
        v-touch-swipe
        default-opened
        dense-toggle
        dense
        caption="Publiczne grupy"
        header-class="q-py-sm"
      >
        <q-expansion-item
          v-for="group in publicGroups"
          :key="group.name"
          dense
          header-class="q-py-sm"
        >
          <template
            #header
          >
            <q-item-section
              avatar
              @click.stop="selectGroupTalk(group)"
            >
              <q-avatar>
                <img :src="`https://robohash.org/${group.name}`">
              </q-avatar>
            </q-item-section>

            <q-item-section
              @click.stop="selectGroupTalk(group)"
            >
              {{ group.name }}
            </q-item-section>
          </template>

          <q-expansion-item
            label="W grupie"
            dense
            header-class="q-py-sm"
            class="bg-grey-3"
          >
            <template
              #header
            >
              <q-item-section
                avatar
              >
                <q-avatar
                  icon="list"
                />
              </q-item-section>

              <q-item-section>
                W grupie
              </q-item-section>
            </template>
            <q-item
              v-for="user in group.users"
              :key="user.$id"
              dense-toggle
              dense
              class="q-pl-xl bg-grey-3"
            >
              <q-item-section
                avatar
              >
                <q-avatar
                  size="30px"
                  class="q-mt-none absolute"
                  style="top: -4px"
                >
                  <img
                    :src="
                      user.avatar"
                  >
                </q-avatar>
              </q-item-section>

              <q-item-section
                @click.stop="selectUserTalk(user)"
              >
                {{ user.alias }}
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-expansion-item>
      </q-expansion-item>
      <q-expansion-item
        v-touch-swipe
        default-opened
        dense-toggle
        dense
        caption="Prywatne grupy"
        header-class="q-py-sm"
      >
        <q-expansion-item
          v-for="group in privateGroups"
          :key="group.name"
          dense
          header-class="q-py-sm"
        >
          <template
            #header
          >
            <q-item-section
              avatar
              @click.stop="selectGroupTalk(group)"
            >
              <q-avatar>
                <img :src="`https://robohash.org/${group.name}`">
              </q-avatar>
            </q-item-section>

            <q-item-section
              @click.stop="selectGroupTalk(group)"
            >
              {{ group.name }}
            </q-item-section>
          </template>

          <q-expansion-item
            label="W grupie"
            dense
            header-class="q-py-sm"
            class="bg-grey-3"
          >
            <template
              #header
            >
              <q-item-section
                avatar
              >
                <q-avatar
                  icon="list"
                />
              </q-item-section>

              <q-item-section>
                W grupie
              </q-item-section>
            </template>
            <q-item
              v-for="user in group.users"
              :key="user.$id"
              dense-toggle
              dense
              class="q-pl-xl bg-grey-3"
            >
              <q-item-section
                avatar
              >
                <q-avatar
                  size="30px"
                  class="q-mt-none absolute"
                  style="top: -4px"
                >
                  <img :src="user.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section
                @click.stop="selectUserTalk(user)"
              >
                {{ user.alias }}
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-expansion-item>
      </q-expansion-item>
      <q-expansion-item
        v-touch-swipe
        default-opened
        dense-toggle
        dense
        caption="Bezpośredie rozmowy"
        header-class="q-py-sm"
      >
        <q-expansion-item
          v-for="user in allUsers"
          :key="user.$id"
          dense
          header-class="q-py-none"
        >
          <template
            #header
          >
            <q-item-section
              avatar
              @click.stop="selectUserTalk(user)"
            >
              <q-avatar
                size="30px"
                class="q-mt-none absolute"
                style="top: -4px"
              >
                <img :src="user.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section
              @click.stop="selectUserTalk(user)"
            >
              {{ user.alias }}
            </q-item-section>
            <q-item-section

              side
            >
              <q-icon
                name="info"
                color="primary"
              />
            </q-item-section>
          </template>
          <q-card
            v-for="(userStory, k) in user.stories"
            :key="k"
          >
            <q-card
              v-if="userStory.type === 'vcard'"
              dark
              class="bg-grey-9"
            >
              <q-card-section>
                <div class="text-h6">
                  {{ userStory.title }}
                </div>
                <div class="text-subtitle2">
                  {{ userStory.subtitle }}
                </div>
              </q-card-section>

              <q-separator
                dark
                inset
              />

              <q-card-section>
                {{ userStory.notice }}
              </q-card-section>
            </q-card>
            <q-card-section>
              {{ userStory.label }} {{ userStory.value }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { Group, User } from 'src/models/User'
import { Talk } from 'src/models/Talks'
import db from 'boot/firebase'
import firebase from 'firebase'

export default {
    name: 'GroupUsersView',
    computed: {


        publicGroups() {

            return Group.query().where((group) => {
                return group.public === true && group.name !== 'default'
            }).whereHas('users', query => {
                query.whereId(this.$store.state.users.me)
            }).withAll().get()
        },

        privateGroups() {

            return Group.query().where((group) => {
                return !group.public && group.personal.length < 1
            }).whereHas('users', query => {
                query.whereId(this.$store.state.users.me)
            }).withAll().get()
        },

        allUsers() {
            return User.query().with('groups').get()
        },
    },

    methods: {
        selectGroupTalk(group) {
            Talk.update({where: (talk) => talk.active === true, data: {'active': false}})
            Talk.insertOrUpdate({
                data: [{
                    alias: group.name,
                    id: group.id,
                    participants: group.users,
                    active: true
                }]
            })

            // this.$store.commit('messages/ADD_OPENED_TALK', group)
            // this.$store.commit('messages/SET_ACTIVE_TALK', group.id)
            if (this.$q.platform.is.mobile)
                this.$emit('talk_selected')
            console.log(User.query().withAll().get())
            navigator.vibrate([50, 50, 50, 50, 50, 500, 500, 50, 50, 50, 50, 50, 100])
        },

        selectUserTalk(user) {
            let me = User.query().whereId(this.$store.state.users.me).first()

            let group = Group.query().with('users').where('personal', (persons) => {
                if (user.id === me.id) {
                    return persons[0] === me.id && persons[1] === user.id
                }
                return persons.includes(me.id) && persons.includes(user.id)
            }).first()

            if (!group) {
                Group.insert({
                    data: {
                        name: me.alias + '/' + user.alias,
                        personal: [me.id, user.id],
                        public: false,
                        users: [me, user]
                    }
                })
                group = Group.query().where('personal', (persons) => {
                    if (user.id === me.id) {
                        return persons[0] === me.id && persons[1] === user.id
                    }
                    return persons.includes(me.id) && persons.includes(user.id)
                }).first().$toJson()
                delete group.users
                Promise.all([this.addGroup(me, group), this.addGroup(user, group)])
                    .then(() => {
                        console.log('Document successfully updated!')
                    })
                    .catch((error) => {
                        console.error('Error updating document: ', error)
                    })
            }

            Talk.update({where: (talk) => talk.active === true, data: {'active': false}})
            Talk.insertOrUpdate({
                data: {
                    id: group.id,
                    alias: user.alias,
                    participants: [user, me],
                    active: true
                }
            })

            // this.$store.commit('messages/ADD_OPENED_TALK', user)
            // this.$store.commit('messages/SET_ACTIVE_TALK', talk.id)
            if (this.$q.platform.is.mobile)
                this.$emit('talk_selected')
        },

        addGroup(user, group) {
            let userDoc = db.collection('users').doc(user.id)
            return userDoc.update({
                groups: firebase.firestore.FieldValue.arrayUnion(group)
            })
        }
    }
}
</script>

<style lang="scss" module>

</style>
