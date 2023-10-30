import BaseModel from "./BaseModel"

export default class InformationPageGalleryBottomData extends BaseModel {
    pageName: string
    text: string
    galleryImgSrcs: [string]
    constructor(id: string, pageName: string, text: string, galleryImgSrcs: [string]) {
        super(id)
        this.pageName = pageName
        this.text = text
        this.galleryImgSrcs = galleryImgSrcs
    }
}
