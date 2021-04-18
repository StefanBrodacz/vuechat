import { format, formatDistance, formatDistanceToNowStrict } from 'date-fns'
import db from 'boot/firebase'
import firebase from 'firebase'
import { isToday } from 'src/helpers/dates'

const MessageListMixin = {
    data() {
        return {
            full_date: false
        }
    },
    filters: {
        relativeDate(value) {
            return formatDistanceToNowStrict(value, {unit: 'day', addSuffix: true})
        },

        formatDate(value, full_date) {
            if (full_date) {
                return format(value, 'y-d-h H:I:s')
            }
            if (isToday(new Date(value))) {
                return format(value, 'H:I:s')
            }
            return formatDistanceToNowStrict(value, {unit: 'day', addSuffix: true})

        },
        fullDate(value) {
            return format(value, 'y-d-h H:I:s')
        }
    },

    props: {
        talk: {type: Object, required: true}
    },

    methods: {
        getQweets(talkId) {
            return this.$store.getters['messages/getQweets'](talkId)
        },

        relativeDate(value) {
            let now = new Date()
            return value ? formatDistance(value.seconds, now / 1000) + ' ago' : ''
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

export default MessageListMixin
