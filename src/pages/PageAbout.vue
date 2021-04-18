<template>
  <q-page class="q-pa-lg">
    <h4 class="q-mt-none q-mb-md text-weight-bold">
      About Qwitter
    </h4>
    <div class="text-body1">
      <p>
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
        1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
        original form, accompanied by English versions from the 1914 translation by H. Rackham.
      </p>
      <p>
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
        1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
        original form, accompanied by English versions from the 1914 translation by H. Rackham.
      </p>
    </div>
  </q-page>
</template>

<script>
// import { User } from '../models/User'
// import db from 'boot/firebase'
// import firebase from 'firebase/app'

export default {
    name: 'PageAbout',
    created() {

        // eslint-disable-next-line no-unused-vars
        const users1 = [
            {
                alias: 'Jesse Burns',
                avatar: 'https://robohash.org/Burns',
                stories: [
                    {
                        type: 'vcard',
                        title: 'Veronica Campos',
                        subtitle: 'prograimsta',
                        notice: 'Od 12 lat w firmie. Robię różne rzeczy.'
                    }
                ],

                groups: [{
                    name: 'default',
                    public: true
                },
                {
                    name: 'Friends',
                    public: true
                },
                {
                    name: 'Secret',
                    public: false
                }]
            },
            {
                alias: 'Morgan Melendez',
                avatar: 'https://robohash.org/Melendez',
                stories: [
                    {
                        type: 'vcard',
                        title: 'Veronica Campos',
                        subtitle: 'prograimsta',
                        notice: 'Od 12 lat w firmie. Robię różne rzeczy.'
                    }
                ],

                groups: [{
                    name: 'default',
                    public: true
                },
                {
                    name: 'Friends',
                    public: true
                },
                {
                    name: 'Secret',
                    public: false
                },
                {
                    name: 'PROGRAMIŚCI',
                    public: false
                },
                {
                    name: 'ADMINISTRATORZY',
                    public: false
                }]
            },
            {
                alias: 'Veronica Campos',
                avatar: 'https://robohash.org/Campos',
                stories: [
                    {
                        type: 'vcard',
                        title: 'Veronica Campos',
                        subtitle: 'prograimsta',
                        notice: 'Od 12 lat w firmie. Robię różne rzeczy.'
                    }
                ],

                groups: [{
                    name: 'default',
                    public: true
                },
                {
                    name: 'Friends',
                    public: true
                }]
            },
            {
                alias: 'Slavik',
                avatar: 'https://robohash.org/Slavik',
                stories: [
                    {
                        type: 'vcard',
                        title: 'Slavik Baranov',
                        subtitle: 'prograimsta',
                        notice: 'Od 12 lat w firmie. Robię różne rzeczy.'
                    }
                ],

                groups: [{
                    name: 'default',
                    public: true
                },
                {
                    name: 'Friends',
                    public: true
                },
                {
                    name: 'PROGRAMIŚCI',
                    public: false
                }]
            },
            {
                alias: 'Romanova',
                avatar: 'https://robohash.org/Romanova',
                stories: [
                    {
                        type: 'vcard',
                        title: 'Gavriila Romanova',
                        subtitle: 'prograimsta',
                        notice: 'Od 12 lat w firmie. Robię różne rzeczy.'
                    }
                ],

                groups: [{
                    name: 'default',
                    public: true
                },
                {
                    name: 'Friends',
                    public: true
                },
                {
                    name: 'PROGRAMIŚCI',
                    public: false
                }]
            },
            {
                alias: 'Irina',
                avatar: 'https://robohash.org/Irina',
                stories: [
                    {
                        type: 'vcard',
                        title: 'Irina Petrova',
                        subtitle: 'prograimsta',
                        notice: 'Od 12 lat w firmie. Robię różne rzeczy.'
                    }
                ],

                groups: [{
                    name: 'default',
                    public: true
                },
                {
                    name: 'Friends',
                    public: true
                },
                {
                    name: 'ADMINISTRATORZY',
                    public: false
                }]
            },
        ]


        // db.collection('users')
        //     .onSnapshot((snapshot) => {
        //         snapshot.docChanges().forEach((change) => {
        //             // console.log(change)
        //             User.insert({data: change.doc.data()})
        //         })
        //     })
        // console.log(Group.query().with('users').get())
        // User.insert({ data: users1 })
        // let users = User.query().where('alias', 'Jesse Burns').with('groups').get()
        // let users = User.query().with('groups').get()
        // console.log(users)
        // let batch = db.batch()
        // users.forEach((user) => {
        //     let docRef = db.collection('users').doc(user.$toJson().id) //automatically generate unique id
        //     batch.set(docRef, user.$toJson())
        // })
        //
        // let groups = Group.all()
        // groups.forEach((group) => {
        //     console.log(group.$toJson())
        //     let docRef = db.collection('groups').doc(group.$toJson().id) //automatically generate unique id
        //     batch.set(docRef, group.$toJson())
        // })
        //
        // let groupsUsers = GroupUser.all()
        // groupsUsers.forEach((groupUsers) => {
        //
        //     console.log(groupUsers.$toJson())
        //     let docRef = db.collection('groupsUsers').doc() //automatically generate unique id
        //     batch.set(docRef, groupUsers.$toJson())
        // })

        // batch.commit()
    }
}
</script>
