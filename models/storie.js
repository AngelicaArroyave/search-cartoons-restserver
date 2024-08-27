import { model, Schema } from 'mongoose'

const StorieSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'The title field is required' ],
        unique: true
    },
    description: {
        type: String,
        required: [ true, 'The description is required' ]
    },
    price: {
        type: Number,
        required: [ true, 'The price is required' ]
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Creator'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

StorieSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()

    return data
}

export const Storie = model('Storie', StorieSchema)