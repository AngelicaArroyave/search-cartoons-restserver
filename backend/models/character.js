import { model, Schema } from 'mongoose'

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'The name field is required' ],
        unique: true
    },
    description: {
        type: String,
        required: [ true, 'The description field is required' ]
    },
    image: {
        type: String,
        required: [ true, 'The URL for the image field is required' ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

CharacterSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()

    return data
}

export const Character = model('Character', CharacterSchema)