import { Creator } from '../models/creator.js'
import { request, response } from 'express'

export const createCreator = async(req = request, res = response) => {
    const { firstName, middleName, lastName, fullName, image } = req.body
    const creatorDB = await Creator.findOne({ fullName })

    if(creatorDB) return res.status(400).json({ msg: `The creator ${creatorDB.fullName} already exists` })

    const data = {
        firstName,
        middleName,
        lastName,
        fullName,
        image,
        user: req.user._id
    }
    const creator = await Creator(data)
    
    await creator.save()
    res.status(201).json({ creator })
}

export const listCreators = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const creators = await Creator.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Creator.countDocuments()

    res.status(200).json({ total, creators })
}

export const creatorById = async(req = request, res = response) => {
    const { id } = req.params
    const creator = await Creator.findById(id).populate('user', 'name')

    res.status(200).json({ creator })
}

export const updateCreator = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body
    const creatorDB = await Creator.findOne({ firstName: data.firstName })

    if(creatorDB) return res.status(400).json({ msg: `The creator ${creatorDB.fullName} already exists` })

    const creator = await Creator.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ creator })
}

export const deleteCreate = async(req = request, res = response) => {
    const { id } = req.params
    const creator = await Creator.findByIdAndDelete(id)

    res.status(200).json({ creator })
}