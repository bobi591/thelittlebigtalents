export class NavbarItem {
    name: string;
    href: string;
    childItems?: Array<NavbarItem>;
    hasDividerOnTop: boolean;

    constructor(name:string, href:string, hasDividerOnTop: boolean, elements?: Array<NavbarItem>){
        this.name = name;
        this.href = href;
        this.hasDividerOnTop = hasDividerOnTop;
        this.childItems = elements;
    }
}

export default class NavbarData {
    content: Array<NavbarItem>;
    constructor(content: Array<NavbarItem> ){
        this.content = content;
    }
}