import { Comic } from '../models/comic.js'
import { request, response } from 'express'

export const createComic = async(req = request, res = response) => {
    const { title, description, price, image, character, event, creator } = req.body
    const comicDB = await Comic.findOne({ title })

    if(comicDB) return res.status(400).json({ msg: `The comic ${comicDB.title} already exists` })

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
    const comic = await Comic(data)

    await comic.save()
    res.status(201).json({ comic })
}

export const listComics = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const comics = await Comic.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Comic.countDocuments()

    res.status(200).json({ total, comics })
}

export const comicById = async(req = request, res = response) => {
    const { id } = req.params
    const comic = await Comic.findById(id).populate('user', 'name')

    res.status(200).json({ comic })
}

export const updateComic = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body // Fields that cannot be modified
    const comicDB = await Comic.findOne({ title: data.title })

    if(comicDB) return res.status(400).json({ msg: `The comic ${comicDB.title} already exists` })

    const comic = await Comic.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ comic })
}

export const deleteComic = async(req = request, res = response) => {
    const { id } = req.params
    const comic = await Comic.findByIdAndDelete(id)

    res.status(200).json({ comic })
}