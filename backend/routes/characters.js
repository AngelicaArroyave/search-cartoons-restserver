import { Character } from '../models/character.js'
import { characterById, createCharacter, deleteCharacter, listCharacters, updateCharacter } from '../controllers/characters.js'
import { check } from 'express-validator'
import { IDExists } from '../helpers/db-validators.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerCharacters = Router()

routerCharacters.get('/', [ validateJWT ], listCharacters)

routerCharacters.get('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Character)),
    validateFields
], characterById)

routerCharacters.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('image', 'The image is required').not().isEmpty(),
    validateFields
], createCharacter)

routerCharacters.put('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Character)),
    validateFields
], updateCharacter)

routerCharacters.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id', 'The id is required').custom(IDExists(Character)),
    validateFields
], deleteCharacter)