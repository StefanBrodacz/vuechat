<template>
  <q-list>
    <transition-group
      appear
      enter-active-class="animated fadeIn slow "
      leave-active-class="animated fadeOut slow"
    >
      <DiminishRow
        v-for="qweet in getQweets(talk.id)"
        :key="qweet.id"
        :qweet="qweet"
      />
    </transition-group>
  </q-list>
</template>

<script>
import MessagesListMixin from 'src/mixins/Talks/MessagesListMixin'
import DiminishRow from 'components/Talks/MessagesList/Diminish/DiminishRow'


export default {
    name: 'Diminish',
    components: {DiminishRow},
    mixins: [MessagesListMixin],
}
</script>

<style lang="scss" module>

</style>
