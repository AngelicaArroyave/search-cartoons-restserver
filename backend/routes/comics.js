import { check } from 'express-validator'
import { Comic } from '../models/comic.js'
import { comicById, createComic, deleteComic, listComics, updateComic } from '../controllers/comics.js'
import { IDExists } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerComics = Router()

routerComics.get('/', [ validateJWT ], listComics)

routerComics.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Comic)),
    validateFields
], comicById)

routerComics.post('/', [
    validateJWT,
    isAdminRole,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    check('creator', 'The creator ID is required').not().isEmpty(),
    validateFields
], createComic)

routerComics.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Comic)),
    validateFields
], updateComic)

routerComics.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Comic)),
    validateFields
], deleteComic)