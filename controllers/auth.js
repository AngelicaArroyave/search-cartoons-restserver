import { generateJWT } from '../helpers/generate-jwt.js'
import { request, response } from 'express'
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'

export const login = async(req = request, res = response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if(!user) return res.status(400).json({ msg: 'User / Password is not correct - email' })
        if(!user.state) return res.status(400).json({ msg: 'User / Password is not correct - state: false' })

        const validPassword = bcryptjs.compareSync(password, user.password) // Verify password

        if(!validPassword) return res.status(400).json({ msg: 'User / Password is not correct - password' })

        const token = await generateJWT(user.id) // Generate JWT

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}