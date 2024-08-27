import { Serie } from '../models/serie.js'
import { request, response } from 'express'

export const createSerie = async(req = request, res = response) => {
    const { title, description, price, image, character, event, creator } = req.body
    const serieDB = await Serie.findOne({ title })

    if(serieDB) return res.status(400).json({ msg: `The serie ${serieDB.title} already exists` })

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
    const serie = await Serie(data)

    await serie.save()
    res.status(201).json({ serie })
}

export const listSeries = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const series = await Serie.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Serie.countDocuments()

    res.status(200).json({ total, series })
}

export const serieById = async(req = request, res = response) => {
    const { id } = req.params
    const serie = await Serie.findById(id).populate('user', 'name')

    res.status(200).json({ serie })
}

export const updateSerie = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body // Fields that cannot be modified
    const serieDB = await Serie.findOne({ title: data.title })

    if(serieDB) return res.status(400).json({ msg: `The serie ${serieDB.title} already exists` })

    const serie = await Serie.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ serie })
}

export const deleteSerie = async(req = request, res = response) => {
    const { id } = req.params
    const serie = await Serie.findByIdAndDelete(id)

    res.status(200).json({ serie })
}