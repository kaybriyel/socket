import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: process.env.PORT,
    SESSION_NAME:  process.env.SESSION_NAME,
    SESSION_DOMAIN:  process.env.SESSION_DOMAIN,
    SESSION_SECRET: process.env.SESSION_SECRET,
    PROTOCOL: process.env.PROTOCOL,
    KEY_PEM: process.env.KEY_PEM,
    CERT_PEM: process.env.CERT_PEM,
    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN,
    USE_CORS: process.env.USE_CORS,
    REDIS_URL: process.env.REDIS_URL || ''
}