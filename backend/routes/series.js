import { check } from 'express-validator'
import { createSerie, deleteSerie, listSeries, serieById, updateSerie } from '../controllers/series.js'
import { IDExists } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { Serie } from '../models/serie.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerSeries = Router()

routerSeries.get('/', [ validateJWT ], listSeries)

routerSeries.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Serie)),
    validateFields
], serieById)

routerSeries.post('/', [
    validateJWT,
    isAdminRole,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    check('creator', 'The creator ID is required').not().isEmpty(),
    validateFields
], createSerie)

routerSeries.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Serie)),
    validateFields
], updateSerie)

routerSeries.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Serie)),
    validateFields
], deleteSerie)