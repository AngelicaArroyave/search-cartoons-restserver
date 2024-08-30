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

export const IDExists = (Model) => async(id = '') => {
    const exists = await Model.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}