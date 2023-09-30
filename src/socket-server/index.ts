import { Server as HttpServer, IncomingMessage, ServerResponse } from "http";
import { Server as SocketIOServer, Socket, Namespace } from 'socket.io'

class SocketServer extends SocketIOServer {

    constructor(httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>) {
        super(httpServer, {
            cors: {
                origin: ['https://admin.socket.io', 'http://localhost'],
                credentials: true
            }
        })

        // main namespace
        this.use(this.authenticateClient.bind(this))
        this.on('connection', this.connection.bind(this))
        this.addRoomListeners(this.sockets)

        // custom namespaces
        this.of((name, auth, next) => {
            next(null, authorize())
            function authorize() {
                const basicAuth = auth.username === 'admin' && auth.password === 'admin'
                return auth.token === 'WPFUvHkB1aHA5TDSZi6xt' || basicAuth
            }
        })

        this.on('new_namespace', nsp => {
            // console.log(this.time, 'created new namespace', nsp.name)
            nsp.use(this.authenticateClient.bind(this))
            nsp.on('connection', this.connection.bind(this))
            this.addRoomListeners(nsp)
        })

    }

    authenticateClient(socket: Socket, next: any) {
        let { token, username, password } = socket.handshake.auth
        if (!token) token = socket.handshake.headers.access_token
        // console.log(this.time, socket.id, 'connecting to', socket.nsp.name)

        if (username === 'admin' && password === 'admin')
            next()
        else if (token === 'WPFUvHkB1aHA5TDSZi6xt')
            next()
        else next(new Error('Unauthenticated'))
    }

    connection(socket: Socket) {
        // console.log(this.time, socket.id, 'connected to', socket.nsp.name)
        const { room } = socket.handshake.query
        if (room) socket.join(room)

        if(socket.nsp.name !== '/admin') {
            // socket.onAny((...args) => console.log(this.time, 'received from', socket.id, ...args))
            // socket.onAnyOutgoing((...args) => console.log(this.time, 'sent to', socket.id, ...args))
        }

        socket.on('testing', () => socket.emit('testing'))
        socket.on('testing_all', () => socket.nsp.emit('testing'))
        socket.on('disconnect', reason => this.disconnected(reason, socket))
    }

    disconnected(reason: string, socket: Socket) {
        // console.log(this.time, socket.id, 'disconnected from', socket.nsp.name, 'due to', reason)
    }

    addRoomListeners(nsp: Namespace) {
        nsp.adapter.on('create-room', room => {
            // console.log(this.time, 'created new room', room, 'of', nsp.name)
        })
        nsp.adapter.on('delete-room', room => {
            // console.log(this.time, 'deleted room', room, 'of', nsp.name)
        })
        nsp.adapter.on('join-room', (room, id) => {
            // console.log(this.time, id, 'joined room', room, 'of', nsp.name)
        })
        nsp.adapter.on('leave-room', (room, id) => {
            // console.log(this.time, id, 'leaved room', room, 'of', nsp.name)
        })
    }

    get time() {
        return ''
        // return (new Date).toLocaleTimeString('en-GB')
    }

}


export default SocketServer