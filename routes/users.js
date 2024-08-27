import { check } from 'express-validator'
import { emailExists, IDExists, isValidRole, validateNameWithoutNumbers } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { User } from '../models/user.js'
import { usersDelete, usersGet, usersPost, usersPut } from '../controllers/users.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerUser = new Router()

routerUser.get('/', [
    validateJWT,
    isAdminRole,
], usersGet)

routerUser.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'The name is required').not().isEmpty(),
    check('name', 'The name is not valid').custom(validateNameWithoutNumbers),
    check('email', 'The email is not valid').isEmail(),
    check('email', 'The email is not valid').custom(emailExists),
    check('password', 'The password must be more than 6 characters long').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields
], usersPost)

routerUser.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('role').custom(isValidRole),
    validateFields
], usersPut)

routerUser.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(IDExists(User)),
    validateFields
], usersDelete)