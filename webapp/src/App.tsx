import React from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import FooterComponent from "./components/footer/FooterComponent";
import MaintenancePage from "./components/pages/MaintenancePage";
import ErrorBoundaryComponentState from "./components/ErrorBoundaryComponentState";

export class AppProps {
  public pageToShow!: React.ReactNode;
}

/**
 * This is main App Component which also acts as an Error Boundary.
 */
export default class App extends React.Component<AppProps, ErrorBoundaryComponentState> {

  state: ErrorBoundaryComponentState = {
    error: undefined
  }

  constructor(props: AppProps) {
    super(props);
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
    if(this.state.error !== undefined) {
      return <MaintenancePage errorMessage={String(this.state.error)}/>
    }
    else {
      return (
        <div className="App">
          <NavbarComponent/>
          <body>
            {this.props.pageToShow}
          </body>
          <FooterComponent/>
        </div>
      )
    }
  }
}