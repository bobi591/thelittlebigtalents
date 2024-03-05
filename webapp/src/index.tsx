import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageWrapper from './App'
import './App.css'
import {
    fetchInformationPageData,
    fetchInformationPageGalleryBottomData,
    fetchPagesMetadata,
} from './AppSlice'
import AuthorizedApp from './components/authorized/AuthorizedApp'
import BookingsPage from './components/authorized/bookings/BookingsPage'
import DataEditorPage from './components/authorized/dataeditor/DataEditorPage'
import LoadingOverlay from './components/overlays/loading/LoadingOverlay'
import InformationPage from './components/pages/information/InformationPage'
import InformationPageGalleryBottom from './components/pages/informationGalleryBottom/InformationPageGalleryBottom'
import './index.css'
import { AppStore } from './ReduxStore'
import reportWebVitals from './reportWebVitals'

const App = lazy(() => import('./App'))
const HomePage = lazy(() => import('./components/pages/home/HomePage'))
const NotFoundPage = lazy(
    () => import('./components/pages/notfound/NotFoundPage')
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

TimeAgo.addDefaultLocale(en)

const router = createBrowserRouter([
    {
        element: <NotFoundPage />,
        path: '*',
    },
    {
        element: (
            <LoadingOverlay>
                <App />
            </LoadingOverlay>
        ),
        path: '/',
        loader: () => {
            return <HomePage />
        },
    },
    {
        element: <PageWrapper />,
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
                        return <InformationPage pageName={pageName} />
                    }
                    if (typeName === 'InformationPageGalleryBottom') {
                        await AppStore.dispatch(
                            fetchInformationPageGalleryBottomData(pageName)
                        )
                        return (
                            <InformationPageGalleryBottom pageName={pageName} />
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

root.render(
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
