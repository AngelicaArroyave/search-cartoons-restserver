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
        this.middlewares()
        this.routes() // Application paths
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.static('public')) // Public directory
    }

    routes() {
        this.app.use(this.paths.users, routerUser)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}