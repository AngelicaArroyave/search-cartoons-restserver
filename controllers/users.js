import { request, response } from 'express'
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'

export const usersGet = async(req = request, res = response) => {
    const { limit = 2, from = 0 } = req.query
    const query = { state: true }
    const users = await User.find(query).skip(Number(from)).limit(Number(limit))
    const total = await User.countDocuments(query)
    
    res.status(200).json({
        total,
        users
    })
}

export const usersPost = async(req = request, res = response) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    // Encrypt password
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()
    res.status(201).json({ user })
}

export const usersPut = async(req = request, res = response) => {
    const { id } = req.params
    const { _id, email, password, google, ...rest } = req.body // Fields that cannot be modified

    if(password) {
        const salt = bcryptjs.genSaltSync(10)
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true })

    res.status(200).json({ user })
}

export const usersDelete = async(req = request, res = response) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { state: false }, { new: true }) // The record is not deleted, only the status is modified

    res.status(200).json({ user })
}