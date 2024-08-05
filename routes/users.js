import { Router } from 'express'
import { usersGet } from '../controllers/users.js'

export const routerUser = new Router()

routerUser.get('/', usersGet)