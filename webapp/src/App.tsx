import { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { provideFooterData, provideNavbarData } from './AppSlice'
import FooterComponent from './components/footer/FooterComponent'
import NavbarComponent from './components/navbar/NavbarComponent'
import NotFoundPage from './components/pages/notfound/NotFoundPage'
import Backend from './datasource/Backend'
import FooterData from './datasource/models/FooterData'
import NavbarData from './datasource/models/NavbarData'
import { AppState, useAppDispatch } from './ReduxStore'

type PageWrapperProps = {
    footerData?: FooterData
    navbarData?: NavbarData
}

export const App = ({ footerData, navbarData,  }: PageWrapperProps) => {
    const dispatch = useAppDispatch()
    const pageToShow = useLoaderData()

    const isDataLoaded = useMemo(() => {
        return Boolean(footerData) && Boolean(navbarData)
    }, [footerData, navbarData])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isDataLoaded) {
            Backend.getFooter().then((data) =>
                dispatch(provideFooterData(data))
            )
            Backend.getNavbar().then((data) =>
                dispatch(provideNavbarData(data))
            )
        }
    }, [pageToShow])

    const pageContent =
        pageToShow !== null && isDataLoaded ? (
            <>
                <NavbarComponent navbarData={navbarData!} />
                {pageToShow}
                <FooterComponent footerData={footerData!} />
            </>
        ) : (
            <NotFoundPage />
        )

    return <div className="App">{isDataLoaded ? pageContent : <></>}</div>
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

export default connect(mapStateToProps, mapDispatchToProps())(App)
