import FooterData from './datasource/models/FooterData'
import InformationPageData from './datasource/models/InformationPageData'
import InformationPageGalleryBottomData from './datasource/models/InformationPageGalleryBottomData'
import NavbarData from './datasource/models/NavbarData'
import PageMetadata from './datasource/models/PageMetadata'

export type AppComponentProps = {
    error?: Error
    footerData?: FooterData
    navbarData?: NavbarData
    pageToShow?: JSX.Element
    isSubPageLoaded?: boolean
    informationPageData?: InformationPageData
    informationPageGalleryBottomData?: InformationPageGalleryBottomData
    pagesMetadata?: Map<string, PageMetadata>
    isLandingAnimationSeen?: boolean
}

export default interface ErrorBoundaryComponentState {
    error?: Error
}
