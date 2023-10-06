import React from 'react'
import { connect } from 'react-redux'
import { AppComponentProps } from './AppComponentProps'
import { provideError, provideFooterData, provideNavbarData } from './AppSlice'
import FooterComponent from './components/footer/FooterComponent'
import NavbarComponent from './components/navbar/NavbarComponent'
import MaintenancePage from './components/pages/MaintenancePage'
import Backend from './datasource/Backend'
import { AppState, AppStore } from './ReduxStore'

/**
 * This is main App Component which also acts as an Error Boundary.
 */
export class App extends React.Component<AppComponentProps> {
    constructor(props: AppComponentProps) {
        super(props)
    }

    async componentDidMount() {
        try {
            // If the Footer Data and Navbar Data are already loaded, there's no need to reload them again...
            if (
                this.props.footerData == undefined ||
                this.props.navbarData == undefined
            ) {
                const footerData = await Backend.getFooter()
                const navbarData = await Backend.getNavbar()
                if (footerData == undefined || navbarData == undefined) {
                    throw 'Emptry navbar or footer data.'
                } else {
                    AppStore.dispatch(provideFooterData(footerData!))
                    AppStore.dispatch(provideNavbarData(navbarData!))
                }
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
        const loader = <div className="loader"></div>

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
