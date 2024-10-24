import { Suspense, useEffect, useMemo } from 'react'
import { connect, Provider } from 'react-redux'
import {
    createBrowserRouter,
    RouterProvider,
    useLoaderData,
} from 'react-router-dom'
import {
    fetchInformationPageData,
    fetchInformationPageGalleryBottomData,
    fetchPagesMetadata,
    provideFooterData,
    provideNavbarData,
} from './AppSlice'
import AuthorizedApp from './components/authorized/AuthorizedApp'
import BookingsPage from './components/authorized/bookings/BookingsPage'
import DataEditorPage from './components/authorized/dataeditor/DataEditorPage'
import FooterComponent from './components/footer/FooterComponent'
import NavbarComponent from './components/navbar/NavbarComponent'
import LoadingOverlay from './components/overlays/loading/LoadingOverlay'
import { OpacityTransitionOverlay } from './components/overlays/transition/OpacityTransitionOverlay'
import HomePage from './components/pages/home/HomePage'
import InformationPage from './components/pages/information/InformationPage'
import InformationPageGalleryBottom from './components/pages/informationGalleryBottom/InformationPageGalleryBottom'
import NotFoundPage from './components/pages/notfound/NotFoundPage'
import Backend from './datasource/Backend'
import FooterData from './datasource/models/FooterData'
import NavbarData from './datasource/models/NavbarData'
import { AppState, AppStore, useAppDispatch } from './ReduxStore'

type PageWrapperProps = {
    footerData?: FooterData
    navbarData?: NavbarData
}

const createMainPage = ({ footerData, navbarData }: PageWrapperProps) => {
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

const Main = connect(mapStateToProps, mapDispatchToProps)(createMainPage)

const router = createBrowserRouter([
    {
        element: <NotFoundPage />,
        path: '*',
    },
    {
        element: (
            <LoadingOverlay>
                <Main />
            </LoadingOverlay>
        ),
        path: '/',
        loader: () => {
            return (
                <OpacityTransitionOverlay>
                    <HomePage />
                </OpacityTransitionOverlay>
            )
        },
    },
    {
        element: (
            <LoadingOverlay>
                <Main />
            </LoadingOverlay>
        ),
        path: '/page/:pageId',
        loader: async ({ params }) => {
            const pageId = params.pageId as string

            // Make sure pages metadata is loaded first
            await AppStore.dispatch(fetchPagesMetadata())

            // Then consume pages metadata from the state
            const {
                app: { pagesMetadata },
            } = AppStore.getState()

            if (pagesMetadata) {
                const pageMetadata = pagesMetadata.get(pageId)
                if (pageMetadata) {
                    const { pageName, typeName } = pageMetadata
                    if (typeName === 'InformationPage') {
                        await AppStore.dispatch(
                            fetchInformationPageData(pageName)
                        )
                        return (
                            <OpacityTransitionOverlay>
                                <InformationPage pageName={pageName} />
                            </OpacityTransitionOverlay>
                        )
                    }
                    if (typeName === 'InformationPageGalleryBottom') {
                        await AppStore.dispatch(
                            fetchInformationPageGalleryBottomData(pageName)
                        )
                        return (
                            <OpacityTransitionOverlay>
                                <InformationPageGalleryBottom
                                    pageName={pageName}
                                />
                            </OpacityTransitionOverlay>
                        )
                    }
                }
            }
            return null
        },
    },
    {
        element: <AuthorizedApp pageToShow={<DataEditorPage />} />,
        path: '/editor',
    },
    {
        element: <AuthorizedApp pageToShow={<BookingsPage />} />,
        path: '/bookings',
    },
])

const App = () => (
    <Suspense>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
        />
        <Provider store={AppStore}>
            <RouterProvider router={router} />
        </Provider>
    </Suspense>
)

export default App
