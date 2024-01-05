import BaseModel from './BaseModel'

export default class InformationPageGalleryBottomData extends BaseModel {
    pageName: string
    text: string
    galleryImagesBlobNames: [string]
    constructor(
        id: string,
        pageName: string,
        text: string,
        galleryImagesBlobNames: [string]
    ) {
        super(id)
        this.pageName = pageName
        this.text = text
        this.galleryImagesBlobNames = galleryImagesBlobNames
    }
}
