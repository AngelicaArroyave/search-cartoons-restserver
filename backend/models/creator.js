import { model, Schema } from 'mongoose'

const CreatorSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, 'The first name field is required' ],
        unique: true
    },
    middleName: {
        type: String,
        required: [ true, 'The middle name field is required' ],
    },
    lastName: {
        type: String,
        required: [ true, 'The last name field is required' ],
    },
    fullName: {
        type: String,
        required: [ true, 'The full name field is required' ],
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

CreatorSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()

    return data
}

export const Creator = model('Creator', CreatorSchema)