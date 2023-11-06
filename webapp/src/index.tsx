import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthorizedApp from './components/authorized/AuthorizedApp'
import DataEditorPage from './components/authorized/dataeditor/DataEditorPage'
import './index.css'
import { AppStore } from './ReduxStore'
import reportWebVitals from './reportWebVitals'

const App = lazy(() => import('./App'))
const HomePage = lazy(() => import('./components/pages/home/HomePage'))
const MaintenancePage = lazy(
    () => import('./components/pages/maintenance/MaintenancePage')
)
const NotFoundPage = lazy(
    () => import('./components/pages/notfound/NotFoundPage')
)
const InformationPageGalleryBottom = lazy(
    () =>
        import(
            './components/pages/informationGalleryBottom/InformationPageGalleryBottom'
        )
)
const InformationPage = lazy(
    () => import('./components/pages/information/InformationPage')
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

TimeAgo.addDefaultLocale(en)

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
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage />}></Route>
                    <Route
                        path="/"
                        element={<App pageToShow={<HomePage />} />}
                    ></Route>
                    <Route
                        path="/achievements"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Постижения'} />
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="/summerclasses"
                        element={
                            <App
                                pageToShow={
                                    <InformationPageGalleryBottom
                                        pageName={'Летни Уроци'}
                                    />
                                }
                            />
                        }
                    ></Route>
                    <Route
                        path="/editor"
                        element={
                            <AuthorizedApp pageToShow={<DataEditorPage />} />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </Suspense>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
