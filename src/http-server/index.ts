import express from 'express'
import env from '../env'
import https from 'https'
import fs from 'fs'
import bodyParser from 'body-parser'
import appRoute from './routes/route'
// import { redisClient } from '../utils/redis'


export default {
    run() {
        const app = express()
        app.use(bodyParser.json({ limit: '50mb' }))
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
        app.use('/', express.static('public'))
        app.use(appRoute())

        // redisClient.subscribe('ossp_api_database_data', (err, count) => console.log('sub:', count))

        // redisClient.on('message', (channel, message) => {
        //     console.log(channel, message)
        // })

        if (env.PROTOCOL === 'https') return serverHttps()
        else return serverHttp()

        function serverHttps() {
            const server = https.createServer({
                key: fs.readFileSync(env.KEY_PEM as string),
                cert: fs.readFileSync(env.CERT_PEM as string)
            }, app)
            server.listen(env.PORT, () => {
                console.log(`Listening on ${env.PROTOCOL} on port ${env.PORT}`)
            })
            return server
        }

        function serverHttp() {
            return app.listen(env.PORT, () => {
                console.log(`Listening on ${env.PROTOCOL} on port ${env.PORT}`)
            })
        }
    }
}