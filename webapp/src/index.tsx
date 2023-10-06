import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Suspense, lazy } from 'react'
import DataEditorPage from './components/pages/DataEditorPage'
import AuthorizedApp from './AuthorizedApp'
import { AppStore, useAppDispatch } from './ReduxStore'
import { Provider } from 'react-redux'
import { providePageToShow } from './AppSlice'

const App = lazy(() => import('./App'))
const HomePage = lazy(() => import('./components/pages/HomePage'))
const MaintenancePage = lazy(() => import('./components/pages/MaintenancePage'))
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'))
const InformationPageGalleryBottom = lazy(
    () => import('./components/pages/InformationPageGalleryBottom')
)
const InformationPage = lazy(() => import('./components/pages/InformationPage'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Suspense>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap"
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
