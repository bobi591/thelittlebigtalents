import FooterData from './datasource/models/FooterData'
import InformationPageData from './datasource/models/InformationPageData'
import InformationPageGalleryBottomData from './datasource/models/InformationPageGalleryBottomData'
import NavbarData from './datasource/models/NavbarData'

export type AppComponentProps = {
    error?: Error
    footerData?: FooterData
    navbarData?: NavbarData
    pageToShow?: JSX.Element
    isSubPageLoading?: boolean
    informationPageData?: InformationPageData
    informationPageGalleryBottomData?: InformationPageGalleryBottomData
}

export default interface ErrorBoundaryComponentState {
    error?: Error
}
