import { request, response } from 'express'

export const isAdminRole = (req = request, res = response, next) => {
    if(!req.user) return res.status(500).json({ msg: 'Role verification is required without validating the token first' })

    const { role, name } = req.user

    if(role !== 'ADMIN_ROLE')  return res.status(401).json({ msg: `${name} is not an administrator - No permissions` })

    next()
}