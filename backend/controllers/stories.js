import { Storie } from '../models/storie.js'
import { request, response } from 'express'

export const createStorie = async(req = request, res = response) => {
    const { title, description, price, image, character, event, creator } = req.body
    const storieDB = await Storie.findOne({ title })

    if(storieDB) return res.status(400).json({ msg: `The storie ${storieDB.title} already exists` })

    const data = {
        title,
        description,
        price,
        image,
        character,
        event,
        creator,
        user: req.user._id
    }
    const storie = await Storie(data)

    await storie.save()
    res.status(201).json({ storie })
}

export const listStories = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const stories = await Storie.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Storie.countDocuments()

    res.status(200).json({ total, stories })
}

export const storieById = async(req = request, res = response) => {
    const { id } = req.params
    const storie = await Storie.findById(id).populate('user', 'name')

    res.status(200).json({ storie })
}

export const updateStorie = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body // Fields that cannot be modified
    const storieDB = await Storie.findOne({ title: data.title })

    if(storieDB) return res.status(400).json({ msg: `The storie ${storieDB.title} already exists` })

    const storie = await Storie.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ storie })
}

export const deleteStorie = async(req = request, res = response) => {
    const { id } = req.params
    const storie = await Storie.findByIdAndDelete(id)

    res.status(200).json({ storie })
}