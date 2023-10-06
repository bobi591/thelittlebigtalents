import { ReactElement } from "react"
import FooterData from "./datasource/models/FooterData"
import NavbarData from "./datasource/models/NavbarData"

export type AppComponentProps = {
    error?: Error
    footerData?: FooterData,
    navbarData?: NavbarData,
    pageToShow?: JSX.Element
}

export default interface ErrorBoundaryComponentState {
    error?: Error
}