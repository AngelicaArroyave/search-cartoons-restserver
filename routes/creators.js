import { check } from 'express-validator'
import { createCreator, creatorById, deleteCreate, listCreators, updateCreator } from '../controllers/creators.js'
import { creatorIDExists } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerCreators = Router()

routerCreators.get('/', [ validateJWT ], listCreators)

routerCreators.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(creatorIDExists),
    validateFields
], creatorById)

routerCreators.post('/', [
    validateJWT,
    isAdminRole,
    check('firstName', 'The first name is required').not().isEmpty(),
    check('middleName', 'The middle name is required').not().isEmpty(),
    check('lastName', 'The last name is required').not().isEmpty(),
    check('fullName', 'The full name is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    validateFields
], createCreator)

routerCreators.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(creatorIDExists),
    validateFields
], updateCreator)

routerCreators.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(creatorIDExists),
    validateFields
], deleteCreate)