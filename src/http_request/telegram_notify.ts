import request from ".";

export default function telegramNotify(chat_id: number, text: string) {

    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '2028443178:AAGDeOsGsX6G7VfB-aZ6F6c4hIYkqj8KXUs'
    
    const payload = {
        chat_id,
        text
    }

    const option = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify(payload),
        timeout: 3000
    }
    try {
        return request(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, option)
    } catch (error) {
        return error
    }
}