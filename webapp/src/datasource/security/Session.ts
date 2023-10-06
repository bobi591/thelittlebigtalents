export default class Session {
    sessionId: string
    username: string
    secondsExpiry: number

    constructor(sessionId: string, username: string, secondsExpiry: number) {
        this.sessionId = sessionId
        this.username = username
        this.secondsExpiry = secondsExpiry
    }
}
