<template>
  <q-list dense>
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
          @click.stop="selectUser(user)"
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
          @click.stop="selectUser(user)"
        >
          {{ user.alias }}
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
  </q-list>
</template>

<script>
import { User } from 'src/models/User'

export default {
    name: 'UserSelect',
    computed: {
        allUsers() {
            return User.query().with('groups').get()
        }
    },

    methods: {
        selectUser(user){
            this.$store.commit('users/SET_ME', user.id)
        }
    }
}
</script>

<style lang="scss" module>

</style>
