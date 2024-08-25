import { model, Schema } from 'mongoose'

const EventSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'The title field is required' ],
        unique: true
    },
    description: {
        type: String,
        required: [ true, 'The description is required' ]
    },
    image: {
        type: String,
        required: [ true, 'The URL for the image field is required' ]
    },
    startDate: {
        type: Date,
        required: [ true, 'The start date is required' ],
        get: date => date.toISOString().slice(0,10), // Formato YYYY-MM-DD al recuperar
        set: date => new Date(date) // Acepta un String en formato YYYY-MM-DD
    },
    endDate: {
        type: Date,
        required: [ true, 'The end date is required' ],
        get: date => date.toISOString().slice(0,10), // Formato YYYY-MM-DD al recuperar
        set: date => new Date(date) // Acepta un String en formato YYYY-MM-DD
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

EventSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()

    return data
}

export const Event = model('Event', EventSchema)