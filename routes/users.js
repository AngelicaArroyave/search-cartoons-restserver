import { check } from 'express-validator'
import { emailExists, isValidRole, userIDExists } from '../helpers/db-validators.js'
import { Router } from 'express'
import { usersDelete, usersGet, usersPost, usersPut } from '../controllers/users.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const routerUser = new Router()

routerUser.get('/', usersGet)

routerUser.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email', 'The email is not valid').custom(emailExists),
    check('password', 'The password must be more than 6 characters long').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields
], usersPost)

routerUser.put('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('role').custom(isValidRole),
    validateFields
], usersPut)

routerUser.delete('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(userIDExists),
    validateFields
], usersDelete)