import { cartoonIDExists } from '../helpers/db-validators.js'
import { check } from 'express-validator'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { cartoonById, createCartoon, deleteCartoon, listCartoons, updateCartoon } from '../controllers/cartoons.js'

export const routerCartoons = Router()

routerCartoons.get('/', [ validateJWT ], listCartoons)

routerCartoons.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(cartoonIDExists),
    validateFields
], cartoonById)

routerCartoons.post('/', [
    validateJWT,
    isAdminRole,
    check('title', 'The title is required').not().isEmpty(),
    check('year', 'The year is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),
    check('genre', 'The genre is required').not().isEmpty(),
    check('runtime', 'The runtime is required').not().isEmpty(),
    check('episodes', 'The episodes is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    check('creator', 'The creator ID is required').not().isEmpty(),
    validateFields
], createCartoon)

routerCartoons.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(cartoonIDExists),
    validateFields
], updateCartoon)

routerCartoons.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(cartoonIDExists),
    validateFields
], deleteCartoon)