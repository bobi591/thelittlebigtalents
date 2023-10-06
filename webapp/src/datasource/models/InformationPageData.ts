export default class InformationPageData {
    className!: string
    pageName: string
    data: [InformationPageDataPart]

    constructor(pageName: string, data: [InformationPageDataPart]) {
        this.pageName = pageName
        this.data = data
    }
}

class InformationPageDataPart {
    imageSrc: string
    text: string

    constructor(imageSrc: string, text: string) {
        this.imageSrc = imageSrc
        this.text = text
    }
}
