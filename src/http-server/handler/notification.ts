import app from '../../server'

export default function notify(req: any, res: any) {
    console.log(req.method, '/notify')
    const { event, nsps, rooms, ...data } = req.body;
    console.log('=========================================')
    console.log('Emitting', event)
    console.log('Data', data)
    console.log('=========================================')
    if(event) {
        if(nsps === '*') {
            app.io._nsps.forEach(nsp => nsp.emit(event, data))
        } else if(nsps) {
            nsps.split(',').forEach((nsp: string) => app.io.of(`/${nsp}`).emit(event, data))
        } else {
            app.io.emit(event, data)
        }
    }
    res.json({ event, status: 'SUCCESS' });
}