export default class InformationPageGalleryBottomData {
    className!: string;
    pageName: string;
    text: string;
    galleryImgSrcs: [string];
    constructor(pageName:string, text:string, galleryImgSrcs: [string]) {
        this.pageName = pageName;
        this.text = text;
        this.galleryImgSrcs = galleryImgSrcs;
    }
}