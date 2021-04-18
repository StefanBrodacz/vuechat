<template>
  <q-list separator>
    <transition-group
      appear
      enter-active-class="animated fadeIn slow "
      leave-active-class="animated fadeOut slow"
    >
      <q-item
        v-for="qweet in getQweets(talk.id)"
        :key="qweet.id"
        class="qweet q-py-md"
      >
        <IntersectionObserver
          :talk="talk"
          :message="qweet"
        >
          <q-item-section
            :id="talk.id"
            avatar
            top
          >
            <q-avatar>
              <img :src="userAvatar(qweet.author)">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1">
              <strong>{{ qweet.author | userAlias }}</strong>
              <span class="text-grey-7 q-pl-sm">@robo__hash <br
                class="lt-md"
              > &bull; {{ qweet.date | relativeDate }} ago</span>
            </q-item-label>
            <q-item-label class="qweet-content text-body1">
              {{ qweet.content }}
            </q-item-label>
            <div class="row justify-between q-mt-sm qweet-icons">
              <q-btn
                flat
                round
                color="grey"
                size="sm"
                icon="chat_bubble_outline"
              />
              <q-btn
                flat
                round
                color="grey"
                size="sm"
                icon="fas fa-retweet"
              />
              <q-btn
                flat
                round
                :color="qweet.liked.value ? 'pink' : 'grey'"
                size="sm"
                :icon="qweet.liked.value ? 'fas fa-heart' : 'far fa-heart'"
                :title="relativeDate(qweet.liked.updateTimestamp)"
                @click="toggleLiked(qweet)"
              />
              <q-btn
                flat
                round
                color="grey"
                size="sm"
                icon="fas fa-trash"
                @click="deleteQweet(qweet)"
              />
            </div>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <ListWhoSeen
              v-if="qweet.seen"
              :qweet-seen="qweet.seen"
            />
          </q-item-section>
        </IntersectionObserver>
      </q-item>
    </transition-group>
  </q-list>
</template>

<script>
import firebase from 'firebase/app'
import { formatDistance } from 'date-fns'
import db from 'boot/firebase'
import IntersectionObserver from 'components/Talks/MessagesList/IntersectionObserver'
import ListWhoSeen from 'components/Talks/MessagesList/ListWhoSeen'
import { User } from 'src/models/User'

export default {
    name: 'MessagesList',
    components: {ListWhoSeen, IntersectionObserver},
    filters: {
        relativeDate(value) {
            return formatDistance(value, new Date())
        },

        userAlias(id) {
            return User.query().whereId(id).first().alias
        },

        userAvatar(id) {
            return User.query().whereId(id).first().avatar
        }
    },

    props: {
        talk: {type: Object, required: true}
    },

    methods: {
        userAvatar(id) {
            return User.query().whereId(id).first().avatar
        },

        onChange(entry, unobserve) {
            // After loading Cancel monitoring, optimise performance
            if (entry.isIntersecting) {
                unobserve()
            }


        },

        getUser(id) {
            return User.query().whereId(id).first()
        },

        getQweets(talkId) {
            return this.$store.getters['messages/getQweets'](talkId)
        },

        relativeDate(value) {
            let now = new Date()
            return value ? formatDistance(value.seconds, now / 1000, {addSuffix: true}) : ''
        },

        toggleLiked(qweet) {
            let qweetDoc = db.collection('qweets').doc(qweet.id)
            return qweetDoc.update({
                liked: {
                    value: !qweet.liked.value,
                    updateTimestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
            })
                .then(() => {
                    console.log('Document successfully updated!')
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error('Error updating document: ', error)
                })
        },

        deleteQweet(qweet) {
            db.collection('qweets').doc(qweet.id).delete().then(() => {
                console.log('Document successfully deleted!')
            }).catch((error) => {
                console.error('Error removing document: ', error)
            })
        },
    }
}
</script>

<style lang="scss" module>

</style>
