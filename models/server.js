import { dbConnection } from '../database/config.js'
import { routerUser } from '../routes/users.js'
import cors from 'cors'
import express from 'express'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
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
        this.app.use(this.paths.users, routerUser)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}