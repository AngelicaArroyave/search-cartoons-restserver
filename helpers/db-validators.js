import { Character } from '../models/character.js'
import { Comic } from '../models/comic.js'
import { Creator } from '../models/creator.js'
import { Event } from '../models/event.js'
import { Role } from '../models/role.js'
import { User } from '../models/user.js'

export const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ name: role })

    if(!existRole) throw new Error(`The role ${role} is not registered in the database`)
}

export const emailExists = async (email = '') => {
    const exists = await User.findOne({ email })

    if(exists) throw new Error(`The email ${email} is not valid because it is registered in the database`)
}

export const validateNameWithoutNumbers = async (name = '') => {
    const exist = (/\d/).test(name)

    if(exist) throw new Error(`The name ${name} cannot have numbers`)
}

export const userIDExists = async (id = '') => {
    const exists = await User.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const characterIDExists = async (id = '') => {
    const exists = await Character.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const eventIDExists = async (id = '') => {
    const exists = await Event.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const creatorIDExists = async (id = '') => {
    const exists = await Creator.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const comicIDExists = async (id = '') => {
    const exists = await Comic.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}