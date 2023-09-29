export default class Session {
    username: string;
    expiry: Date;
    constructor(username: string, expiry: Date) {
        this.username = username;
        this.expiry = expiry;
    }
}