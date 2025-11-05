export function parseJwt(token: string | null) {

    if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        return decoded
    } else {
        return null
    }
}