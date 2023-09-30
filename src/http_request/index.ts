import http from 'http'
const { FetchStream } = require('fetch')
interface IResponse {
    status: number
    json?: any
    text?: any
}

/**
 * Send http request
 * @param req client request from browser
 * @returns response status and response json
 */
export default function request(url: string, options: http.RequestOptions) {
    return new Promise<IResponse>((res, rej) => {
        let text = ''

        const fetch = new FetchStream(url, options)
        fetch.on('error', (err: Error) => rej(err))
        fetch.on('data', (d: string) => text += d)
        fetch.on('end', () => {
            try {
                const json = JSON.parse(text)
                res({ status: fetch.meta.status, json, text })
            } catch (error) {
                res({
                    status: fetch.meta.status, json: {
                        message: 'Could not parse json!'
                    }, text
                })
            }
        })
    })
}
