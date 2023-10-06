import { Component, ReactNode } from "react";
import Session from "./datasource/security/Session";
import { Button, Col, Container, Row } from "react-bootstrap";
import Backend from "./datasource/Backend";
import { AppComponentProps } from "./AppComponentProps";

type AuthorizedAppState = {
    inputUsername?: string;
    inputPassword?: string;
    session?: Session;
}

export default class AuthorizedApp extends Component<AppComponentProps, AuthorizedAppState> {

    constructor(props: AppComponentProps) {
        super(props);
    }

    componentDidMount(): void {
        window.setInterval(() => {
            if(this.state.session !== undefined) {
                Backend.refreshSession(this.state.session).then((session) => this.setState({...this.state, session: session}))
                .catch(() => this.setState({}));
            }
        }, 50000);
    }

    state: AuthorizedAppState = {
        inputUsername: undefined,
        inputPassword: undefined,
        session: undefined
    }



    onLoginClick(): void {
        Backend.createSession({
            username: this.state.inputUsername!,
            password: this.state.inputPassword!
        })
        .then((session) => {
            this.setState({
                ...this.state,
                session: session
            })
        })
        .catch((error) => {
                window.alert(error)
            }
        )
    }

    render(): ReactNode {
        if(this.state.session === undefined || this.state.session?.secondsExpiry < Math.floor(new Date().getTime() / 1000)){
            return(            
                <Container className="dataEditorRoot" fluid="md">
                    <div className='text-center title'>
                        <h4>Малките Големи Таланти</h4>
                    </div>
                    <Row className="justify-content-md-center">
                        <Col>
                            <div className="editor">
                                <div className="form">
                                    <div className="mb-3">
                                        <div className="label">Username</div>
                                        <input className="form-control" type="text" placeholder="username123" onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            this.setState({...this.state, inputUsername: e.target.value})}/>
                                    </div>
                                    <div className="mb-3">
                                        <div className="label">Password</div>
                                        <input className="form-control" type="password" onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
                                            this.setState({...this.state, inputPassword: e.target.value})}/>
                                    </div>
                                    <Button type="button" onClick={() => this.onLoginClick()} 
                                        disabled={this.state.inputPassword == undefined || this.state.inputUsername == undefined}
                                    >Влез</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }
        else {
            return this.props.pageToShow;
        }
    }
}