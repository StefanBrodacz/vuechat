<template>
  <Observer
    class="full-width flex"
    :threshold="threshold"
    @on-change="onChange"
  >
    <slot />
  </Observer>
</template>

<script>
import Observer from 'vue-intersection-observer'
import db from 'boot/firebase'
import firebase from 'firebase/app'

export default {
    name: 'IntersectionObserver',
    components: {Observer},
    props: {
        talk: {type: Object, required: true},
        message: {type: Object, required: true},
    },

    data() {
        return {
            threshold: [0.5],

        }
    },

    computed: {
        who() {
            return this.$store.state.users.me
        }
    },

    methods: {
        onChange(entry, unobserve) {
            // After loading Cancel monitoring, optimise performance
            if (entry.isIntersecting) {
                unobserve()
                this.wasSeen()
            }
        },

        wasSeen() {

            if(this.message.seen !== undefined && this.message.seen.findIndex((seen) => seen.who === this.who) >-1)
                return

            let qweetDoc = db.collection('qweets').doc(this.message.id)
            qweetDoc.update({
                seen: firebase .firestore.FieldValue.arrayUnion(
                    {
                        who: this.who,
                        when: Date.now()
                    })
            })
                .then(() => {
                    // console.log('Document successfully updated!')
                })
                .catch(() => {
                    // The document probably doesn't exist.
                    // console.error('Error updating document: ', error)
                })
        }
    },
}
</script>

<style lang="scss" module>

</style>
