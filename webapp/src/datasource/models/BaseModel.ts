export default abstract class BaseModel {
    id: string
    typeName!: string
    constructor(id: string) {
        this.id = id
    }
}
