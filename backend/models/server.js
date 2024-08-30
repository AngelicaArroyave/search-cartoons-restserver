import { dbConnection } from '../database/config.js'
import { routerAuth } from '../routes/auth.js'
import { routerCartoons } from '../routes/cartoons.js'
import { routerCharacters } from '../routes/characters.js'
import { routerComics } from '../routes/comics.js'
import { routerCreators } from '../routes/creators.js'
import { routerEvents } from '../routes/events.js'
import { routerSeries } from '../routes/series.js'
import { routerStories } from '../routes/stories.js'
import { routerUser } from '../routes/users.js'
import cors from 'cors'
import express from 'express'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: '/api/auth',
            cartoons: '/api/cartoons',
            characters: '/api/characters',
            comics: '/api/comics',
            creators: '/api/creators',
            events: '/api/events',
            series: '/api/series',
            stories: '/api/stories',
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
        this.app.use(this.paths.cartoons, routerCartoons),
        this.app.use(this.paths.characters, routerCharacters),
        this.app.use(this.paths.comics, routerComics),
        this.app.use(this.paths.creators, routerCreators),
        this.app.use(this.paths.events, routerEvents),
        this.app.use(this.paths.series, routerSeries),
        this.app.use(this.paths.stories, routerStories),
        this.app.use(this.paths.users, routerUser)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}