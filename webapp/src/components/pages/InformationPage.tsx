import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { isSubPageLoading, provideError } from '../../AppSlice'
import Backend from '../../datasource/Backend'
import InformationPageData from '../../datasource/models/InformationPageData'
import { AppStore } from '../../ReduxStore'
import PageProps from './PageProps'

type PageComponentState = {
    pageData?: InformationPageData
}

export default class InformationPage extends React.Component<
    PageProps,
    PageComponentState
> {
    constructor(props: PageProps) {
        super(props)
    }

    state: PageComponentState = {
        pageData: undefined,
    }

    async componentDidMount() {
        AppStore.dispatch(isSubPageLoading(true))
        try {
            const retrievedPageData = await Backend.getInformationPageData(
                this.props.pageName
            )
            if (retrievedPageData === undefined) {
                throw 'Empty page data.'
            }
            this.setState({ ...this.state, pageData: retrievedPageData })
        } catch (error) {
            AppStore.dispatch(provideError(error as Error))
        } finally {
            AppStore.dispatch(isSubPageLoading(false))
        }
    }

    render(): React.ReactNode {
        if (this.state.pageData !== undefined) {
            return (
                <>
                    <Row className="pageTitle">
                        <h4>{this.props.pageName}</h4>
                    </Row>
                    <div className="leftAndRightView">
                        {this.state.pageData!.data.map((dataPart, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <Row className="backgroundLine">
                                        <Row className="linearView">
                                            <Col className="picture">
                                                <img src={dataPart.imageSrc} />
                                            </Col>
                                            <Col className="text right">
                                                <Row>
                                                    <h4>Test</h4>
                                                </Row>
                                                <Row>
                                                    <p>{dataPart.text}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Row>
                                )
                            } else {
                                return (
                                    <Row className="coloredBackgroundLine">
                                        <Row className="linearView">
                                            <Col className="text left">
                                                <Row>
                                                    <h4>Test 2</h4>
                                                </Row>
                                                <Row>
                                                    <p>{dataPart.text}</p>
                                                </Row>
                                            </Col>
                                            <Col className="picture">
                                                <img src={dataPart.imageSrc} />
                                            </Col>
                                        </Row>
                                    </Row>
                                )
                            }
                        })}
                    </div>
                </>
            )
        }
    }
}
