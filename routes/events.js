import { check } from 'express-validator'
import { createEvent, deleteEvent, eventById, listEvents, updateEvent } from '../controllers/events.js'
import { eventIDExists } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerEvents = Router()

routerEvents.get('/', [ validateJWT ], listEvents)

routerEvents.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(eventIDExists),
    validateFields
], eventById)

routerEvents.post('/', [
    validateJWT,
    isAdminRole,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    check('startDate', 'The start date is required').not().isEmpty(),
    check('endDate', 'The end date is required').not().isEmpty(),
    validateFields
], createEvent)

routerEvents.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(eventIDExists),
    validateFields
], updateEvent)

routerEvents.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(eventIDExists),
    validateFields
], deleteEvent)