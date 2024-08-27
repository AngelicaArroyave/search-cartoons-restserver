import { Cartoon } from '../models/cartoon.js'
import { request, response } from 'express'

export const createCartoon = async(req = request, res = response) => {
    const { title, year, rating, genre, runtime, episodes, price, image, creator } = req.body
    const cartoonDB = await Cartoon.findOne({ title })

    if(cartoonDB) return res.status(400).json({ msg: `The cartoon ${cartoonDB.title} already exists` })

    const data = {
        title,
        year,
        rating,
        genre,
        runtime,
        episodes,
        price,
        image,
        creator,
        user: req.user._id
    }
    const cartoon = await Cartoon(data)

    await cartoon.save()
    res.status(201).json({ cartoon })
}

export const listCartoons = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const cartoons = await Cartoon.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Cartoon.countDocuments()

    res.status(200).json({ total, cartoons })
}

export const cartoonById = async(req = request, res = response) => {
    const { id } = req.params
    const cartoon = await Cartoon.findById(id).populate('user', 'name')

    res.status(200).json({ cartoon })
}

export const updateCartoon = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body // Fields that cannot be modified
    const cartoonDB = await Cartoon.findOne({ title: data.title })

    if(cartoonDB) return res.status(400).json({ msg: `The cartoon ${cartoonDB.title} already exists` })

    const cartoon = await Cartoon.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ cartoon })
}

export const deleteCartoon = async(req = request, res = response) => {
    const { id } = req.params
    const cartoon = await Cartoon.findByIdAndDelete(id)

    res.status(200).json({ cartoon })
}