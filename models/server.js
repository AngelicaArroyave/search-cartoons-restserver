import { dbConnection } from '../database/config.js'
import { routerAuth } from '../routes/auth.js'
import { routerCharacters } from '../routes/characters.js'
import { routerEvents } from '../routes/events.js'
import { routerUser } from '../routes/users.js'
import cors from 'cors'
import express from 'express'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: '/api/auth',
            characters: '/api/characters',
            events: '/api/events',
            users: '/api/users'
        }
        this.connectToDB() // Connect to the database
        this.middlewares()
        this.routes() // Application paths
    }

    async connectToDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json()) // Reading and parse of the body
        this.app.use(express.static('public')) // Public directory
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth),
        this.app.use(this.paths.characters, routerCharacters),
        this.app.use(this.paths.events, routerEvents),
        this.app.use(this.paths.users, routerUser)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}