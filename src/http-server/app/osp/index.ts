import { Router } from "express"
import { Socket, Server as SocketIOServer } from 'socket.io'

const router = Router()

class PG {
    lookups: number = 0
    commits: number = 0
    confirms: number = 0
    reverses: number = 0
}

class OSPRoute {

    private io: SocketIOServer | undefined
    private pgs: any = {}

    init(io: SocketIOServer) {
        this.io = io
        
    }

    route() {
        router.get('/reset', (req, res) => {
            this.pgs = {}
            res.end()
        })
        router.use((req, res, next) => {
            if(!req.query.pg) res.status(422).end()
            else next()
        })
        router.get('/lookup', this.handleLookup.bind(this))
        router.get('/commit', this.handleCommit.bind(this))
        router.get('/confirm', this.handleConfirm.bind(this))
        router.get('/reverse', this.handleReverse.bind(this))
        return router
    }

    registerSocket(socket: any) {
        socket.on('osp-requests', this.response.bind(this))
    }

    private handleLookup(req: any, res: any) {
        const pg = this.pgs[req.query.pg] || new PG
        pg.lookups++
        this.pgs[req.query.pg] = pg
        res.json(this.response())
    }

    private handleCommit(req: any, res: any) {
        const pg = this.pgs[req.query.pg] || new PG
        pg.commits++
        this.pgs[req.query.pg] = pg
        res.json(this.response())
    }

    private handleConfirm(req: any, res: any) {
        const pg = this.pgs[req.query.pg] || new PG
        pg.confirms++
        this.pgs[req.query.pg] = pg
        res.json(this.response())
    }

    private handleReverse(req: any, res: any) {
        const pg = this.pgs[req.query.pg] || new PG
        pg.reverses++
        this.pgs[req.query.pg] = pg
        res.json(this.response())
    }

    private response() {
        const data = this.pgs
        this.io?.emit('osp-requests', data)
        return data
    }

}

export default new OSPRoute()
