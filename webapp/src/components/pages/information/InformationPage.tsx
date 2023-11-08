import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import InformationPageData from '../../../datasource/models/InformationPageData'
import { AppState } from '../../../ReduxStore'
import PageProps from '../PageProps'

class InformationPage extends React.Component<PageProps<InformationPageData>> {
    constructor(props: PageProps<InformationPageData>) {
        super(props)
    }

    render(): React.ReactNode {
        const pageHeader =
            this.props.pageData?.headerVideoSrc !== undefined ? (
                <>
                    <video
                        className="video-banner"
                        src={this.props.pageData?.headerVideoSrc}
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    />
                    <h4 className="video-banner-text">{this.props.pageName}</h4>
                </>
            ) : (
                <Row className="pageTitle">
                    <h4>{this.props.pageName}</h4>
                </Row>
            )
        return (
            <>
                <Row>{pageHeader}</Row>
                <div className="leftAndRightView">
                    {this.props.pageData!.data.map((dataPart, index) => {
                        if (index % 2 === 0) {
                            return (
                                <Row
                                    className="backgroundLine"
                                    style={
                                        index == 0 ? { paddingTop: '0' } : {}
                                    }
                                >
                                    <Row className="linearView">
                                        <Col className="picture">
                                            <img src={dataPart.imageSrc} />
                                        </Col>
                                        <Col
                                            className="text right"
                                            style={
                                                index == 0
                                                    ? { marginTop: '0' }
                                                    : {}
                                            }
                                        >
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

const mapStateToProps = (state: AppState) => {
    return {
        pageData: state.app.informationPageData,
    }
}

export default connect(mapStateToProps)(InformationPage)
