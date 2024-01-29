import BaseModel from './BaseModel'

export default class Booking extends BaseModel {
    parentName: string
    parentEmail: string
    parentPhone: string
    studentName: string
    studentAge: string
    isContacted: boolean
    notes: string
    constructor(
        id: string,
        parentName: string,
        parentEmail: string,
        parentPhone: string,
        studentName: string,
        studentAge: string,
        isContacted: boolean,
        notes: string
    ) {
        super(id)
        this.parentName = parentName
        this.parentEmail = parentEmail
        this.parentPhone = parentPhone
        this.studentName = studentName
        this.studentAge = studentAge
        this.isContacted = isContacted
        this.notes = notes
    }
}
