import express from 'express'
import notify from '../handler/notification'
import app from '../../server'

export const router = express.Router()

export default function appRoute() {

    router.post('/notify', notify)
    router.get('/sockets', async (req, res) => {
        const mainNSP = app.io.sockets
        const engine = app.io.engine
        app.io._nsps.forEach(nsp => nsp.emit('hello'))
        res.json({
            main: mainNSP.sockets.size,
            engine: engine.clientsCount
        })
    })
    
    return router
}