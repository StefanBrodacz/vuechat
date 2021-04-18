<template>
  <q-timeline
    :layout="$q.platform.is.mobile ? 'dense' : 'comfortable'"
    color="secondary"
    class="q-pl-lg q-pr-sm float-left timeline"
    side="right"
  >
    <transition-group
      appear
      enter-active-class="animated fadeIn slow "
      leave-active-class="animated fadeOut slow"
    >
      <q-timeline-entry
        v-for="qweet in getQweets(talk.id)"
        :key="qweet.id"
        :title="qweet.author | userAlias"
        :avatar="qweet.author | userAvatar"
        :subtitle="qweet.date | relativeDate"
        :side="qweet.author === me ? 'left' : 'right'"
        :body="qweet.content"
        :color="qweet.author === me ? 'primary' : 'grey-9'"
      >
        <IntersectionObserver
          :talk="talk"
          :message="qweet"
        >
          <div :id="qweet.id" />
        </IntersectionObserver>
      </q-timeline-entry>
    </transition-group>
  </q-timeline>
</template>

<script>
import firebase from 'firebase/app'
import { formatDistance } from 'date-fns'
import db from 'boot/firebase'
import { User } from 'src/models/User'
import IntersectionObserver from 'components/Talks/MessagesList/IntersectionObserver'

export default {
    name: 'TimelineMessages',
    components: {IntersectionObserver},
    filters: {
        relativeDate(value) {
            return formatDistance(value, new Date(), {addSuffix: true})
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

    computed: {
        me() {
            return this.$store.state.users.me
        }

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

<style lang="scss">
.timeline {

}

.q-timeline--comfortable {
    & .q-timeline__subtitle {
        width: auto;
        font-size: xx-small;

    }

    & .q-timeline__title {
        color: dimgrey;
        margin-bottom: 2px;
        font-size: xx-small;
    }

    & .q-timeline__content {
        padding-bottom: 5px;
    }
}
</style>
