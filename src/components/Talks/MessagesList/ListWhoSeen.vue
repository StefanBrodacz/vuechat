<template>
  <div
    class="column"
    style="width: 15vw; height: 15vh"
  >
    <q-scroll-area class="col">
      <q-list
        dense
      >
        <q-slide-item
          v-for="(seen, i) in qweetSeen"
          :key="i"

          @left="onLeft"
          @right="onRight"
        >
          <template #left>
            <q-icon name="done" />
          </template>
          <template #right>
            <q-icon name="alarm" />
          </template>

          <q-item dense>
            <q-item-section avatar>
              <q-avatar
                size="x-large"
              >
                <img :src="userAvatar(seen.who)">
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ seen.who | userAlias }}</q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { User } from 'src/models/User'

export default {
    name: 'ListWhoSeen',

    filters: {
        userAlias(id) {
            return User.query().whereId(id).first().alias
        },
    },

    props:{
        qweetSeen: {type: Array, required: true}
    },

    beforeDestroy() {
        clearTimeout(this.timer)
    },

    methods: {
        userAvatar(id){
            return User.query().whereId(id).first().avatar
        },

        onLeft({reset}) {
            // this.$q.notify('Left action triggered. Resetting in 1 second.')
            this.finalize(reset)
        },

        onRight({reset}) {
            // this.$q.notify('Right action triggered. Resetting in 1 second.')
            this.finalize(reset)
        },

        finalize(reset) {
            this.timer = setTimeout(() => {
                reset()
            }, 1000)
        }
    }

}
</script>

<style lang="scss" module>

</style>
