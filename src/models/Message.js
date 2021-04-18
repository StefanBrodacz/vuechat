import { Model } from '@vuex-orm/core'
import { uuid } from 'uuidv4'
import { User } from 'src/models/User'

export class Message extends Model {
    static entity = 'message'

    static primaryKey = 'id'

    static fields() {
        return {
            id: this.uid(() => uuid()),
            author: this.belongsTo(User, 'user_id'),
            content: this.attr(null),
            date: this.date(null),
            seenBy: this.belongsToMany(User, MessageSeenBy, 'user_id', 'message_id'),
            participants: this.belongsToMany(User, ParticipantMessage, 'user_id', 'message_id'),

        }
    }
}

export class MessageSeenBy extends Model {
    static entity = 'messageSeenBy'

    static primaryKey = ['message_id', 'user_id']

    static fields() {
        return {
            message_id: this.attr(null),
            user_id: this.attr(null)
        }
    }
}

export class ParticipantMessage extends Model {
    static entity = 'participantMessage'

    static primaryKey = ['message_id', 'user_id']

    static fields() {
        return {
            message_id: this.attr(null),
            user_id: this.attr(null)
        }
    }
}
