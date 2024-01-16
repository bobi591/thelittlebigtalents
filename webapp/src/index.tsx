import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import {
    fetchInformationPageData,
    fetchInformationPageGalleryBottomData,
} from './AppSlice'
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
                                pageLoadAction={fetchInformationPageData(
                                    'Постижения'
                                )}
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
                                pageLoadAction={fetchInformationPageGalleryBottomData(
                                    'Летни Уроци'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/individual/vocals"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={'Поп и джаз пеене'}
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Поп и джаз пеене'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/individual/piano"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Пиано'} />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Пиано'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/individual/guitar"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Китара'} />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Китара'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/individual/drums"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Барабани'} />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Барабани'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/prep/highschool"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={
                                            'Подготвителни уроци за средно музикално училище'
                                        }
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Подготвителни уроци за средно музикално училище'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/prep/uppereducation"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={
                                            'Подготвителни уроци за висшо музикално училище'
                                        }
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Подготвителни уроци за висшо музикално училище'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/group/solfegetheory"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={'Солфеж и музикална теория'}
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Солфеж и музикална теория'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/group/piano"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={'Пиано за най-малките'}
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Пиано за най-малките'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/group/vocal"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={'Вокална група'}
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Вокална група'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/about/disciplines"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage
                                        pageName={'Музикални дисциплини'}
                                    />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Музикални дисциплини'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/about/team"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Екип'} />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Екип'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/about/mission"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Мисия'} />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Мисия'
                                )}
                            />
                        }
                    ></Route>
                    <Route
                        path="/prices"
                        element={
                            <App
                                pageToShow={
                                    <InformationPage pageName={'Цени'} />
                                }
                                pageLoadAction={fetchInformationPageData(
                                    'Цени'
                                )}
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
