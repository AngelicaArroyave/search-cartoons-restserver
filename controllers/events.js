import { Event } from '../models/event.js'
import { request, response } from 'express'

export const createEvent = async(req = request, res = response) => {
    const { title, description, image, startDate, endDate } = req.body
    const eventDB = await Event.findOne({ title })

    if(eventDB) return res.status(400).json({ msg: `The event ${eventDB.title} already exists` })

    const data = {
        title: `${title[0].toUpperCase()}${title.slice(1)}`,
        description,
        image,
        startDate,
        endDate,
        user: req.user._id
    }
    const event = new Event(data)

    await event.save()
    res.status(201).json({ event })
}

export const listEvents = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const events = await Event.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Event.countDocuments()

    res.status(200).json({ total, events })
}

export const eventById = async(req = request, res = response) => {
    const { id } = req.params
    const event = await Event.findById(id).populate('user', 'name')

    res.status(200).json({ event })
}

export const updateEvent = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body // Fields that cannot be modified
    const eventDB = await Event.findOne({ title: data.title })

    if(eventDB) return res.status(400).json({ msg: `The event ${eventDB.title} already exists` })

    const event = await Event.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ event })
}

export const deleteEvent = async(req = request, res = response) => {
    const { id } = req.params
    const event = await Event.findByIdAndDelete(id)

    res.status(200).json({ event })
}