import { model, Schema } from 'mongoose'

const SerieSchema = new Schema({
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
    image: {
        type: String,
        required: [ true, 'The URL for the image field is required' ]
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
        ref: 'Creator',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

SerieSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()

    return data
}

export const Serie = model('Serie', SerieSchema)