export default class InformationPageGalleryBottomData {
    pageName: string;
    text: string;
    galleryImgSrcs: [string];
    constructor(pageName:string, text:string, galleryImgSrcs: [string]) {
        this.pageName = pageName;
        this.text = text;
        this.galleryImgSrcs = galleryImgSrcs;
    }
}