import { Model } from '@vuex-orm/core'
import { uuid } from 'uuidv4'

export class User extends Model {
    static entity = 'users'

    static primaryKey = 'id'

    static fields() {
        return {
            id: this.uid(()=>uuid()),
            alias: this.attr(null),
            avatar: this.attr(null),
            stories: this.attr([]),
            groups: this.belongsToMany(Group, GroupUser, 'user_id', 'group_id').as('userGroup')
        }
    }
}

export class Group extends Model {
    static entity = 'groups'

    static primaryKey = 'id'

    static fields() {
        return {
            id: this.uid(()=>uuid()),
            name: this.attr(null),
            public: this.attr(true),
            personal: this.attr([]),
            new_messages: this.attr(0),
            users: this.belongsToMany(User, GroupUser, 'group_id', 'user_id').as('userGroup')
        }
    }
}

export class GroupUser extends Model {
    static entity = 'groupUser'

    static primaryKey = ['group_id', 'user_id']

    static fields() {
        return {
            group_id: this.attr(null),
            user_id: this.attr(null),
            new_messages: this.attr(0)
        }
    }
}


