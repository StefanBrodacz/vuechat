<template>
  <q-item
    class="q-py-none"
    dense
    clickable
    @click.prevent="showActions=!showActions"
  >
    <q-item-section side>
      <q-item-label class="text-subtitle1">
        <span
          class="text-grey-7 q-pl-sm"
          @dblclick="full_date=!full_date"
          @click.stop
        >{{ qweet.date | formatDate(full_date) }} </span>
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <strong>Robo Hash:</strong>
        {{ qweet.content }}
      </q-item-label>
    </q-item-section>
    <q-item-section
      v-if="showActions"
      side
    >
      <div>
        <q-btn
          flat
          round
          color="grey"
          size="sm"
          icon="chat_bubble_outline"
          @click.stop
        />
        <q-btn
          flat
          round
          color="grey"
          size="sm"
          icon="fas fa-retweet"
          @click.stop
        />
        <q-btn
          flat
          round
          :color="qweet.liked.value ? 'pink' : 'grey'"
          size="sm"
          :icon="qweet.liked.value ? 'fas fa-heart' : 'far fa-heart'"
          :title="relativeDate(qweet.liked.updateTimestamp)"
          @click.stop="toggleLiked(qweet)"
        />
        <q-btn
          flat
          round
          color="grey"
          size="sm"
          icon="fas fa-trash"
          @click.stop="deleteQweet(qweet)"
        />
      </div>
    </q-item-section>
    <q-item-section
      side
      top
    >
      <q-btn
        size="12px"
        flat
        dense
        round
        icon="more_vert"
        @click.stop
      />
    </q-item-section>
  </q-item>
</template>

<script>
import MessagesListMixin from 'src/mixins/Talks/MessagesListMixin'

export default {
    name: 'DiminishRow',
    mixins: [MessagesListMixin],
    props: {
        qweet: {
            type: Object,
            required: true
        }
    },

    data(){
        return {
            showActions: false
        }
    }
}
</script>

<style lang="scss" module>

</style>
