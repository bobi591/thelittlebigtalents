import BaseModel from './BaseModel'

export default class InformationPageData extends BaseModel {
    pageName: string
    bannerBlobName?: string
    data: [InformationPageDataPart]

    constructor(id: string, pageName: string, data: [InformationPageDataPart]) {
        super(id)
        this.pageName = pageName
        this.data = data
    }
}

export class InformationPageDataPart {
    imageBlobName: string
    heading: string
    text: string

    constructor(imageBlobName: string, heading: string, text: string) {
        this.imageBlobName = imageBlobName
        this.heading = heading
        this.text = text
    }
}
