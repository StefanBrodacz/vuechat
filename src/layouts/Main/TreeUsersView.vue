<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="users"
      node-key="id"
      :expanded.sync="expanded"
      :selected.sync="usersSelected"

      selected-color="white"
    >
      <template #default-body="prop">
        <div v-if="prop.node.story">
          {{ prop.node.story }}
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
export default {
    name: 'TreeUsersView',
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
    }
}
</script>

<style lang="scss" module>

</style>
