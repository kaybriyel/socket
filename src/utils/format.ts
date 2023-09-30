export function durationFormat(start: number, end: number) {
    const s = Math.floor((end - start) / 1000)
    const ms = (end - start) % 1000
    const ds = (i:any) => i >= 10 ? i : `0${i}`
    const dms = (i:any) => i >= 100 ? i : i >= 10 ? `0${i}` : `00${i}`
    return `${ds(s)}s ${dms(ms)}ms`
}

export function currencyFormat(price: number) {
    return price.toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}