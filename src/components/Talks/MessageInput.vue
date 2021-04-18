<template>
  <div
    class=" bg-white"
  >
    <div class="q-pt-none q-px-md row q-col-gutter-sm ">
      <div class="col col-shrink">
        <q-avatar size="xl">
          <img :src="myAvatar">
        </q-avatar>
      </div>

      <div class="col">
        <div class="row">
          <div class="col">
            <q-input
              v-model="newQweetContent"
              bottom-slots
              placeholder="What's happening?"
              counter
              maxlength="280"
              autogrow
              class="new-qweet"
            />
          </div>
        </div>
        <div class="row q-my-sm">
          <div class="col">
            <div class="row">
              <div class="col col-shrink" />
              <div
                class="col text-primary q-gutter-sm"
                style="font-size: 2em"
              >
                <q-icon name="font_download" />
                <q-icon name="format_size" />
                <q-icon name="print" />
                <q-icon name="today" />
                <q-icon name="style" />
              </div>

              <div class="col col-shrink ">
                <q-btn
                  unelevated
                  rounded
                  color="primary"
                  label="Qweet"
                  no-caps
                  :disable="!newQweetContent"
                  @click="addNewQweet(talk)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-separator
      size="10px"
      color="grey-2"
      class="divider"
    />
  </div>
</template>
<script>
import db from 'boot/firebase'
import { User } from 'src/models/User'

export default {
    name: 'MessageInput',
    props: {
        talk: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            newQweetContent: '',
        }
    },

    computed: {
        myAvatar(){
            return User.query().whereId(this.$store.state.users.me).first().avatar
        }
    },

    methods: {

        addNewQweet(talk) {
            let newQweet = {
                content: this.newQweetContent,
                date: Date.now(),
                liked: {value: null, updateTimestamp: null},
                talkId: talk.id,
                author: this.$store.state.users.me,
                participants: talk.participants.flatMap((user)=>user.id),
                seen: [{who: this.$store.state.users.me, when: Date.now()}]
            }

            // this.qweets.unshift(newQweet)
            db.collection('qweets').add(newQweet)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id)
                })
                .catch((error) => {
                    console.error('Error adding document: ', error)
                })
            this.newQweetContent = ''
        },
    }
}
</script>

<style lang="scss" module>

</style>
