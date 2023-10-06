import React from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import FooterComponent from "./components/footer/FooterComponent";
import MaintenancePage from "./components/pages/MaintenancePage";
import { Provider, connect } from "react-redux";
import { AppStore, useAppDispatch, useAppSelector, AppState } from "./ReduxStore";
import Backend from "./datasource/Backend";
import { provideError, provideFooterData, provideNavbarData, providePageToShow } from "./AppSlice";
import { AppComponentProps } from "./AppComponentProps";

/**
 * This is main App Component which also acts as an Error Boundary.
 */
export class App extends React.Component<AppComponentProps> {

  constructor(props: AppComponentProps) {
    super(props);
  }

  async componentDidMount() {
      try{
        const footerData = await Backend.getFooter();
        const navbarData = await Backend.getNavbar();
        if(footerData == undefined || navbarData == undefined) {
          throw("Emptry navbar or footer data.")
        }
        else {
          AppStore.dispatch(provideFooterData(footerData!));
          AppStore.dispatch(provideNavbarData(navbarData!));
        }
      }
      catch(error) {
        AppStore.dispatch(provideError(error as Error));
      }
  }

  componentDidCatch(error: Error): void {
      this.notifyError(error);
  }

  public notifyError(error: any): void {
    this.setState({
        ...this.state,
        error: error,
    })
  }

  render(): React.ReactNode {

    const footerData = this.props.footerData;
    const navbarData = this.props.navbarData;
    const error = this.props.error;

    if(error !== undefined) {
      return <MaintenancePage errorMessage={String(error)}/>
    }
    if(footerData == undefined || navbarData == undefined) {
      return <p>Loading....</p>
    }
    return (
      <div className="App">
        <NavbarComponent/>
          <div>
            {this.props.pageToShow}
          </div>
        <FooterComponent footerData={this.props.footerData!}/>
      </div>
    )
  }
}

const mapStateToProps = ((state: AppState) => {
  return{
    footerData: state.app.footerData,
    navbarData: state.app.navbarData,
    error: state.app.error
  }
})

const mapDispatchToProps = () => ({
  provideFooterData,
  provideNavbarData,
  provideError
})

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);