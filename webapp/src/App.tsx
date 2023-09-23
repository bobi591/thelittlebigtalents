import React from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import FooterComponent from "./components/footer/FooterComponent";
import ErrorCollector, { ErrorCollectionPair } from "./ErrorCollector";
import MaintenancePage from "./components/pages/MaintenancePage";

export class AppProps {
  public pageToShow!: React.ReactNode;
}

export class AppState {
  public errorMessage?: string;
}

export default class App extends React.Component<AppProps, AppState> {

  state: AppState = {
    errorMessage: undefined
  }

  constructor(props: AppProps) {
    super(props);
    ErrorCollector.setErrorNotificationFunc({
      function: this.notifyError,
      instance: this
    });
  }

  public notifyError(error: any): void {
    this.setState({
        ...this.state,
        errorMessage: error,
    })
  }

  render(): React.ReactNode {
    const errorMessage = ErrorCollector.getLatestError();
    if(errorMessage !== undefined) {
      return(
        <MaintenancePage errorMessage={errorMessage}/>
      )
    }
    else{
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