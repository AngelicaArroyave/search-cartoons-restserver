import { Character } from '../models/character.js'
import { request, response } from 'express'

export const createCharacter = async(req = request, res = response) => {
    const { name, description, image } = req.body
    const characterDB = await Character.findOne({ name })

    if(characterDB) return res.status(400).json({ msg: `The character ${characterDB.name} already exists` })

    const data = {
        name: `${name[0].toUpperCase()}${name.slice(1)}`,
        description,
        image,
        user: req.user._id
    }
    const character = new Character(data)

    await character.save()
    res.status(201).json({ character })
}

export const listCharacters = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const characters = await Character.find().populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Character.countDocuments()

    res.status(200).json({ total, characters })
}

export const characterById = async(req = request, res = response) => {
    const { id } = req.params
    const character = await Character.findById(id).populate('user', 'name')

    res.status(200).json({ character })
}

export const updateCharacter = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, user, ...data } = req.body // Fields that cannot be modified
    const characterDB = await Character.findOne({ name: data.name })

    if(characterDB) return res.status(400).json({ msg: `The character ${characterDB.name} already exists` })

    const character = await Character.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({ character })
}

export const deleteCharacter = async(req = request, res = response) => {
    const { id } = req.params
    const character = await Character.findByIdAndDelete(id)

    res.status(200).json({ character })
}