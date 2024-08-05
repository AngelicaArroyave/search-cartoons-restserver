import { response } from 'express'

export const usersGet = (req, res = response) => {
    res.json({ msg: 'Get API - Controller' })
}