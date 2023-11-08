import { AsyncThunkAction } from '@reduxjs/toolkit'
import React from 'react'
import { connect } from 'react-redux'
import { AppComponentProps } from './AppComponentProps'
import { provideError, provideFooterData, provideNavbarData } from './AppSlice'
import FooterComponent from './components/footer/FooterComponent'
import NavbarComponent from './components/navbar/NavbarComponent'
import MaintenancePage from './components/pages/maintenance/MaintenancePage'
import Backend from './datasource/Backend'
import { AppState, AppStore } from './ReduxStore'

/**
 * This is main App Component which also acts as an Error Boundary.
 */

type AppComponentPropsInputs = AppComponentProps & {
    pageLoadAction?: AsyncThunkAction<any, string, any>
}

export class App extends React.Component<AppComponentPropsInputs> {
    constructor(props: AppComponentPropsInputs) {
        super(props)
    }

    async componentDidMount() {
        try {
            const footerData = await Backend.getFooter()
            const navbarData = await Backend.getNavbar()
            if (this.props.pageLoadAction !== undefined) {
                //Page load action used for fetching page data into the generic application's state
                //Invokes the page load action only if provided...
                await AppStore.dispatch(this.props.pageLoadAction)
            }
            if (footerData == undefined || navbarData == undefined) {
                throw 'Emptry navbar or footer data.'
            } else {
                AppStore.dispatch(provideFooterData(footerData!))
                AppStore.dispatch(provideNavbarData(navbarData!))
            }
        } catch (error) {
            AppStore.dispatch(provideError(error as Error))
        }
    }

    componentDidCatch(error: Error): void {
        AppStore.dispatch(provideError(error))
    }

    render(): React.ReactNode {
        const footerData = this.props.footerData
        const navbarData = this.props.navbarData
        const error = this.props.error
        const loader = (
            <div className="loader">
                <img src="/logo.png" width={'7%'} height={'7%'} />
            </div>
        )

        if (error !== undefined) {
            return <MaintenancePage errorMessage={String(error)} />
        }
        if (footerData == undefined || navbarData == undefined) {
            return loader
        }
        if (this.props.isSubPageLoading) {
            return (
                <div className="App">
                    <NavbarComponent navbarData={this.props.navbarData!} />
                    {loader}
                    <FooterComponent footerData={this.props.footerData!} />
                </div>
            )
        }
        return (
            <div className="App">
                <NavbarComponent navbarData={this.props.navbarData!} />
                <div>{this.props.pageToShow}</div>
                <FooterComponent footerData={this.props.footerData!} />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        footerData: state.app.footerData,
        navbarData: state.app.navbarData,
        error: state.app.error,
    }
}

const mapDispatchToProps = () => ({
    provideFooterData,
    provideNavbarData,
    provideError,
})

export default connect(mapStateToProps, mapDispatchToProps())(App)
