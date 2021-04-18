import { Model } from '@vuex-orm/core'
import { uuid } from 'uuidv4'
import { User } from 'src/models/User'

export class Talk extends Model {
    static entity = 'talks'

    static primaryKey = 'id'

    static fields() {
        return {
            id: this.uid(() => uuid()),
            alias: this.attr(null),
            avatar: this.attr(null),
            stories: this.attr([]),
            active: this.attr(true),
            show: this.attr(true),
            participants: this.belongsToMany(User, UserTalk, 'user_id', 'talk_id')
        }
    }
}

export class UserTalk extends Model {
    static entity = 'userTalk'

    static primaryKey = ['talk_id', 'user_id']

    static fields() {
        return {
            talk_id: this.attr(null),
            user_id: this.attr(null)
        }
    }
}
