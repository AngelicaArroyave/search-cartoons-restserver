import { check } from 'express-validator'
import { createStorie, deleteStorie, listStories, storieById, updateStorie } from '../controllers/stories.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { storieIDExists } from '../helpers/db-validators.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerStories = Router()

routerStories.get('/', [ validateJWT ], listStories)

routerStories.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(storieIDExists),
    validateFields
], storieById)

routerStories.post('/', [
    validateJWT,
    isAdminRole,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    validateFields
], createStorie)

routerStories.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(storieIDExists),
    validateFields
], updateStorie)

routerStories.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(storieIDExists),
    validateFields
], deleteStorie)