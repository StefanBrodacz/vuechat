<template>
  <div>
    <q-list>
      <q-item
        v-for="group in publicGroups"
        :key="group.$id"
        v-ripple
        clickable
      >
        <q-item-section
          avatar
          @click.stop="selectGroupTalk(group)"
        >
          <q-avatar>
            <img
              :src="`https://robohash.org/${group.name}`"
              :title="group.name"
            >
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-list>
      <q-item
        v-for="group in privateGroups"
        :key="group.$id"
        v-ripple
        clickable
      >
        <q-item-section
          avatar
          @click.stop="selectGroupTalk(group)"
        >
          <q-avatar>
            <img
              :src="`https://robohash.org/${group.name}`"
              :title="group.name"
            >
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-list>
      <q-item
        v-for="user in allUsers"
        :key="user.$id"
        v-ripple
        clickable
        dense
      >
        <q-item-section
          avatar
          @click.stop="selectUserTalk(user)"
        >
          <q-avatar
            size="30px"
            class="q-mt-none "
          >
            <img
              :src="user.avatar"
              :alt="user.alias"
              :title="user.alias"
            >
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { Group, User } from 'src/models/User'
import { Talk } from 'src/models/Talks'
import db from 'boot/firebase'
import firebase from 'firebase'

export default {
    name: 'MiniListItemUsersView',
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
                return !group.public && group.personal.length<1
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
        },

        selectUserTalk(user) {
            let me = User.query().whereId(this.$store.state.users.me).first()

            let group = Group.query().with('users').where('personal', (persons) => {
                if(user.id===me.id){
                    return persons[0]===me.id && persons[1]===user.id
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
                    if(user.id===me.id){
                        return persons[0]===me.id && persons[1]===user.id
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
            // if (this.$q.platform.is.mobile)
            //     this.$emit('talk_selected')
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
