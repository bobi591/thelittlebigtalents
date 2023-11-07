export default abstract class BaseModel {
    id: string
    className!: string
    constructor(id: string) {
        this.id = id
    }
}
