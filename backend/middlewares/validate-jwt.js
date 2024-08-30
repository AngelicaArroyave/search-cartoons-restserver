import { request, response } from 'express'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const validateJWT = async(req = request, res = response, next) => {
    try {
        const token = req.header('x-token')

        if(!token) return res.status(401).json({ msg: 'No token in the request' })

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(uid)

        if(!user) return res.status(401).json({ msg: 'Token is not valid - User does not exist in the database' })
        if(!user.state) return res.status(401).json({ msg: 'Token is not valid - User with status: false' })
        
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Toke is not valid' })
    }
}