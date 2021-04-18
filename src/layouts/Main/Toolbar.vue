<template>
  <q-tabs
    v-model="activeTalk"
    class="text-white bg-primary"
    indicator-color="white"
    active-color="white"
    inline-label
    outside-arrows
    mobile-arrows
    align="left"
  >
    <q-btn
      v-if="!$q.platform.is.mobile"
      flat
      icon="menu"
      padding="16px"
      @click="$emit('toolbar_button')"
    />
    <q-tab
      v-for="talk in openedTalks"
      :key="`tab-${talk.id}`"
      :name="talk.id"
      :label="talk.alias"
      no-caps
      class="q-pl-md q-pr-sm"
    >
      <q-btn
        icon="close"
        size="sm"
        dense
        outline
        flat
        class="q-ml-sm"
        @click.stop="closeTalk(talk.id)"
      />
    </q-tab>
  </q-tabs>
</template>

<script>
import { Talk } from 'src/models/Talks'

export default {
    name: 'Toolbar',

    computed: {
        activeTalk: {
            get() {
                let talks = Talk.query().where('active', true).get()
                return talks.length > 0 ? talks[0].id : null

                // return this.$store.state.messages.activeTalk
            },

            set(id) {
                Talk.update({
                    where: (talk) => {
                        return talk.active === true
                    },
                    data: {
                        active: false
                    }
                })
                Talk.update({
                    where: id,
                    data: {
                        active: true
                    }
                })
                // this.$store.commit('messages/SET_ACTIVE_TALK', val)
            }
        },

        openedTalks() {
            return Talk.query().where('show', true).get()
            // return this.$store.state.messages.openedTalks
        },
    },

    methods: {
        closeTalk(talkId) {
            Talk.update({where: talkId, data: {'show': false}})
            // this.$store.commit('messages/deleteOpenedTalkState', talkId)
        },
    }
}
</script>

<style lang="sass" scoped>
.q_tab__label
    font-size: 20px !important
</style>
