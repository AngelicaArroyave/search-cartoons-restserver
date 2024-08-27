import { model, Schema } from 'mongoose'

const CartoonSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'The title field is required' ],
        unique: true
    },
    year: {
        type: Number,
        required: [ true, 'The year is required' ]
    },
    rating: {
        type: String,
        required: [ true, 'The rating is required' ]
    },
    genre: {
        type: String,
        required: [ true, 'The genre is required' ]
    },
    runtime: {
        type: Number,
        required: [ true, 'The runtime is required' ]
    },
    episodes: {
        type: Number,
        required: [ true, 'The episodes is required' ]
    },
    price: {
        type: Number,
        required: [ true, 'The price is required' ]
    },
    image: {
        type: String,
        required: [ true, 'The URL for the image field is required' ]
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

CartoonSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()

    return data
}

export const Cartoon = model('Cartoon', CartoonSchema)