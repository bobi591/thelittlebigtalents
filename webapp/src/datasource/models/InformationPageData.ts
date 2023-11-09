import BaseModel from './BaseModel'

export default class InformationPageData extends BaseModel {
    pageName: string
    bannerMediaSrc?: string
    data: [InformationPageDataPart]

    constructor(id: string, pageName: string, data: [InformationPageDataPart]) {
        super(id)
        this.pageName = pageName
        this.data = data
    }
}

export class InformationPageDataPart {
    imageSrc: string
    text: string

    constructor(imageSrc: string, text: string) {
        this.imageSrc = imageSrc
        this.text = text
    }
}
