<template>
  <q-scroll-area class="full-height full-width ">
    <q-list>
      <q-expansion-item
        v-for="group in users"
        :key="group.id"
        :label="group.label"
        :caption="group.caption"
        default-opened
        dense
        header-class="q-py-sm"
      >
        <q-expansion-item
          v-for="user in group.children"
          :key="user.id"
          dense
          header-class="q-py-sm"
        >
          <template
            #header
          >
            <q-item-section
              avatar
              @click.stop="userSelect(user)"
            >
              <q-avatar>
                <img :src="user.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section
              @click.stop="userSelect(user)"
            >
              {{ user.children[0].story }}
            </q-item-section>
          </template>
          <q-card
            v-for="(userStory, k) in user.children"
            :key="k"
          >
            <q-card-section>
              {{ userStory.label }} {{ userStory.story }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
    name: 'ListItemUsersView',
    computed: {
        expanded: {
            get() {
                return this.$store.state.users.expanded
            },

            set(val) {
                this.$store.commit('users/SET_EXPANDED', val)
            }
        },

        usersSelected: {
            get() {
                return this.$store.state.users.selected
            },

            set(id) {
                console.log('asdf')
                this.$store.commit('users/SET_SELECTED', id)
                let user = this.$store.getters['users/findUser'](id)
                this.$store.commit('messages/ADD_OPENED_TALK', user)
                this.$store.commit('messages/SET_ACTIVE_TALK', id)
            }
        },

        usersTicked: {
            get() {
                return this.$store.state.users.ticked
            },

            set(val) {
                this.$store.commit('users/SET_TICKED', val)
            }
        },

        users() {
            return this.$store.state.users.usersTree
        },
    },

    methods: {
        userSelect(user){
            this.$store.commit('messages/ADD_OPENED_TALK', user)
            this.$store.commit('messages/SET_ACTIVE_TALK', user.id)
            if(this.$q.platform.is.mobile)
                this.$emit('talk_selected')
        },
    }
}
</script>

<style lang="scss" module>

</style>
