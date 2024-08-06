import { Router } from 'express'
import { usersDelete, usersGet, usersPost, usersPut } from '../controllers/users.js'

export const routerUser = new Router()

routerUser.get('/', usersGet)

routerUser.post('/', usersPost)

routerUser.put('/:id', usersPut)

routerUser.delete('/', usersDelete)