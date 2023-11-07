import BaseModel from './BaseModel'

export class NavbarItem extends BaseModel {
    name: string
    href: string
    childItems?: Array<NavbarItem>
    hasDividerOnTop: boolean

    constructor(
        id: string,
        name: string,
        href: string,
        hasDividerOnTop: boolean,
        elements?: Array<NavbarItem>
    ) {
        super(id)
        this.name = name
        this.href = href
        this.hasDividerOnTop = hasDividerOnTop
        this.childItems = elements
    }
}

export default class NavbarData {
    content: Array<NavbarItem>
    constructor(content: Array<NavbarItem>) {
        this.content = content
    }
}
