import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { provideFooterData, provideNavbarData } from '../../AppSlice'
import AzureBlobStorage from '../../datasource/AzureBlobStorage'
import Backend from '../../datasource/Backend'
import FooterData from '../../datasource/models/FooterData'
import NavbarData from '../../datasource/models/NavbarData'
import { AppState, useAppDispatch } from '../../ReduxStore'
import FooterComponent from '../footer/FooterComponent'
import NavbarComponent from '../navbar/NavbarComponent'

type PageWrapperProps = {
    footerData?: FooterData
    navbarData?: NavbarData
}

export const PageWrapper = (props: PageWrapperProps) => {
    const dispatch = useAppDispatch()
    const pageToShow = useLoaderData()

    useEffect(() => {
        Backend.getFooter().then((data) => dispatch(provideFooterData(data)))
        Backend.getNavbar().then((data) => dispatch(provideNavbarData(data)))
    }, [])

    const { footerData, navbarData } = props
    const isDataLoaded = Boolean(footerData) && Boolean(navbarData)

    const loaderContent = (
        <div className="loader">
            <img
                src={AzureBlobStorage.getBlobUrl('logo.png')}
                width={'7%'}
                height={'7%'}
            />
        </div>
    )

    const pageContent = (
        <>
            <NavbarComponent navbarData={props.navbarData!} />
            {pageToShow}
            <FooterComponent footerData={props.footerData!} />
        </>
    )

    return (
        <div className="App">{isDataLoaded ? pageContent : loaderContent}</div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        footerData: state.app.footerData,
        navbarData: state.app.navbarData,
    }
}

const mapDispatchToProps = () => ({
    provideFooterData,
    provideNavbarData,
})

export default connect(mapStateToProps, mapDispatchToProps())(PageWrapper)
