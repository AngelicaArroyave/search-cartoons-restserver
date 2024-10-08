import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'The name field is required' ]
    },
    email: {
        type: String,
        required: [ true, 'The email field is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'The password field is required' ]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: [ 'ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE' ]
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id

    return user
}

export const User = model('User', UserSchema)