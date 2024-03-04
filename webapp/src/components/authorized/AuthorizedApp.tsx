import { useEffect } from 'react'
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
import { AppState, useAppDispatch } from '../../ReduxStore'
import {
    AuthorizedAppState,
    showToast,
    updatePassword,
    updateSession,
    updateUsername,
} from './AuthorizedAppSlice'

export const AuthorizedApp = (props: AuthorizedAppState) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.setInterval(async () => {
            if (props.session !== undefined) {
                try {
                    const session = await Backend.refreshSession(props.session)
                    dispatch(updateSession(session!))
                } catch (error) {
                    dispatch(provideError(error as Error))
                }
            }
        }, 50000)
    })

    const isPopupToastEnabled = props.toastPopup !== undefined
    const isLoginDisabled =
        props.username == undefined || props.password == undefined

    const isSessionExpired =
        props.session === undefined ||
        props.session?.secondsExpiry < Math.floor(new Date().getTime() / 1000)

    const onLoginClick = async () => {
        try {
            const session = await Backend.createSession({
                username: props.username!,
                password: props.password!,
            })
            dispatch(updateSession(session!))
        } catch (error) {
            dispatch(provideError(error as Error))
        }
    }

    return isSessionExpired ? (
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
                                        dispatch(updateUsername(e.target.value))
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
                                        dispatch(updatePassword(e.target.value))
                                    }
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={async () => onLoginClick()}
                                disabled={isLoginDisabled}
                            >
                                Влез
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    ) : (
        <Container>
            {props.pageToShow}
            {
                <ToastContainer
                    className="p-3"
                    position="bottom-end"
                    style={{ zIndex: 1 }}
                >
                    <Toast
                        show={isPopupToastEnabled}
                        onClose={() => dispatch(showToast(undefined))}
                    >
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">
                                {props.toastPopup?.header}
                            </strong>
                            <small>
                                <ReactTimeAgo
                                    date={Date.now()}
                                    locale="en-US"
                                />
                            </small>
                        </Toast.Header>
                        <Toast.Body>{props.toastPopup?.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            }
        </Container>
    )
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
