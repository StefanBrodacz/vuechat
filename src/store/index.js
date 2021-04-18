import Vue from 'vue'
import Vuex from 'vuex'


import messages from './messages'
import settings from './settings'
import users from './users'

import VuexORM from '@vuex-orm/core'
import {User, Group, GroupUser} from '../models/User'
import { Talk, UserTalk } from 'src/models/Talks'
import datePlugin from 'vuex-orm-plugin-date-attribute'

VuexORM.use(datePlugin)
Vue.use(Vuex)

// Create a new instance of Database.
const database = new VuexORM.Database()
// Register Models to Database.
database.register(User)
database.register(Group)
database.register(GroupUser)
database.register(Talk)
database.register(UserTalk)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            messages,
            users,
            settings
        },
        plugins: [VuexORM.install(database)],

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING
    })

    // if (process.env.DEV && module.hot) {
    //     module.hot.accept(['./messages'], () => {
    //         const newShowcase = require('./messages').default
    //         Store.hotUpdate({ modules: { showcase: newShowcase } })
    //     })
    // }
    return Store
}
