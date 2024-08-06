import { request, response } from 'express'

export const usersGet = (req = request, res = response) => {
    res.json({ msg: 'Get API - Controller' })
}

export const usersPost = (req = request, res = response) => {
    const { name, lastName } = req.body
    res.json({ msg: 'Post API - Controller', name, lastName })
}

export const usersPut = (req = request, res = response) => {
    const id = req.params.id
    res.json({ msg: 'Put API - Controller', id })

}
export const usersDelete = (req = request, res = response) => {
    res.json({ msg: 'Delete API - Controller' })
}