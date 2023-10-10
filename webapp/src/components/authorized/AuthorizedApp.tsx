import { Component, ReactNode } from 'react'
import {
    Button,
    Col,
    Container,
    Row,
    Toast,
    ToastContainer,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import { provideError } from '../../AppSlice'
import Backend from '../../datasource/Backend'
import { AppState, AppStore } from '../../ReduxStore'
import {
    AuthorizedAppState,
    showToast,
    updatePassword,
    updateSession,
    updateUsername,
} from './AuthorizedAppSlice'

export class AuthorizedApp extends Component<AuthorizedAppState> {
    constructor(props: AuthorizedAppState) {
        super(props)
    }

    componentDidMount() {
        window.setInterval(async () => {
            if (this.props.session !== undefined) {
                try {
                    const session = await Backend.refreshSession(
                        this.props.session
                    )
                    AppStore.dispatch(updateSession(session!))
                } catch (error) {
                    AppStore.dispatch(provideError(error as Error))
                }
            }
        }, 50000)
    }

    async onLoginClick() {
        try {
            const session = await Backend.createSession({
                username: this.props.username!,
                password: this.props.password!,
            })
            AppStore.dispatch(updateSession(session!))
        } catch (error) {
            AppStore.dispatch(provideError(error as Error))
        }
    }

    render(): ReactNode {
        const isPopupToastEnabled = this.props.toastPopup !== undefined
        const isLoginDisabled =
            this.props.username == undefined || this.props.password == undefined
        if (
            this.props.session === undefined ||
            this.props.session?.secondsExpiry <
                Math.floor(new Date().getTime() / 1000)
        ) {
            return (
                <Container className="dataEditorRoot" fluid="md">
                    <div className="text-center title">
                        <h4>Малките Големи Таланти</h4>
                    </div>
                    <Row className="justify-content-md-center">
                        <Col>
                            <div className="editor">
                                <div className="form">
                                    <div className="mb-3">
                                        <div className="label">Username</div>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="username123"
                                            onInput={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                AppStore.dispatch(
                                                    updateUsername(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="label">Password</div>
                                        <input
                                            className="form-control"
                                            type="password"
                                            onInput={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                AppStore.dispatch(
                                                    updatePassword(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={async () =>
                                            this.onLoginClick()
                                        }
                                        disabled={isLoginDisabled}
                                    >
                                        Влез
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    {this.props.pageToShow}
                    {
                        <ToastContainer
                            className="p-3"
                            position="bottom-end"
                            style={{ zIndex: 1 }}
                        >
                            <Toast
                                show={isPopupToastEnabled}
                                onClose={() =>
                                    AppStore.dispatch(showToast(undefined))
                                }
                            >
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">
                                        {this.props.toastPopup?.header}
                                    </strong>
                                    <small>
                                        <ReactTimeAgo
                                            date={Date.now()}
                                            locale="en-US"
                                        />
                                    </small>
                                </Toast.Header>
                                <Toast.Body>
                                    {this.props.toastPopup?.message}
                                </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    }
                </Container>
            )
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        username: state.authorizedApp.username,
        password: state.authorizedApp.password,
        session: state.authorizedApp.session,
        error: state.app.error,
        toastPopup: state.authorizedApp.toastPopup,
    }
}

const mapDispatchToProps = () => ({
    updateUsername,
    updatePassword,
    updateSession,
    provideError,
    showToast,
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedApp)
