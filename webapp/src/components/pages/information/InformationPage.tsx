import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import AzureBlobStorage from '../../../datasource/AzureBlobStorage'
import InformationPageData, {
    InformationPageDataPart,
} from '../../../datasource/models/InformationPageData'
import { AppState } from '../../../ReduxStore'
import MediaBanner from '../../other/MediaBanner'
import PageProps from '../PageProps'

class InformationPage extends React.Component<PageProps<InformationPageData>> {
    constructor(props: PageProps<InformationPageData>) {
        super(props)
    }

    isMobile = window.innerWidth <= 1024

    getMobileLineView(dataPart: InformationPageDataPart) {
        const isImageExisting = dataPart.imageBlobName !== undefined
        const isTextExisting = dataPart.text !== undefined
        const isHeaderExisting = dataPart.heading !== undefined
        const headerElement = isHeaderExisting ? (
            <h5>{dataPart.heading}</h5>
        ) : null
        const result = []
        if (isImageExisting) {
            result.push(
                <Row className="picture">
                    <img
                        src={AzureBlobStorage.getBlobUrl(
                            dataPart.imageBlobName
                        )}
                    />
                </Row>
            )
        }
        if (isTextExisting) {
            result.push(
                <Row>
                    {headerElement}
                    <div dangerouslySetInnerHTML={{ __html: dataPart.text }} />
                </Row>
            )
        }
        return result
    }

    getInnerRightSideView(index: number, dataPart: InformationPageDataPart) {
        const isImageExisting = dataPart.imageBlobName !== undefined
        const isTextExisting = dataPart.text !== undefined
        const isHeaderExisting = dataPart.heading !== undefined
        const headerElement = isHeaderExisting ? (
            <h5>{dataPart.heading}</h5>
        ) : null
        const result = []
        if (isImageExisting) {
            result.push(
                <Col className="picture">
                    <Row>
                        <img
                            src={AzureBlobStorage.getBlobUrl(
                                dataPart.imageBlobName
                            )}
                        />
                    </Row>
                </Col>
            )
        }
        if (isTextExisting) {
            result.push(
                <Col
                    className="text right"
                    style={index == 0 ? { marginTop: '0' } : {}}
                >
                    <Row>
                        {headerElement}
                        <div
                            dangerouslySetInnerHTML={{ __html: dataPart.text }}
                        />
                    </Row>
                </Col>
            )
        }
        return result
    }

    getInnerLeftSideView(dataPart: InformationPageDataPart) {
        const isImageExisting = dataPart.imageBlobName !== undefined
        const isTextExisting = dataPart.text !== undefined
        const isHeaderExisting = dataPart.heading !== undefined
        const headerElement = isHeaderExisting ? (
            <h5>{dataPart.heading}</h5>
        ) : null
        const result = []
        if (isTextExisting) {
            result.push(
                <Col className="text left">
                    <Row>
                        {headerElement}
                        <div
                            dangerouslySetInnerHTML={{ __html: dataPart.text }}
                        />
                    </Row>
                </Col>
            )
        }
        if (isImageExisting) {
            result.push(
                <Col className="picture">
                    <Row>
                        <img
                            src={AzureBlobStorage.getBlobUrl(
                                dataPart.imageBlobName
                            )}
                        />
                    </Row>
                </Col>
            )
        }
        return result
    }

    getMobileVIew(): React.ReactNode {
        return this.props.pageData?.data.map((dataPart, index) => {
            return (
                <Row
                    className="backgroundLine"
                    style={index == 0 ? { paddingTop: '0' } : {}}
                >
                    <Row className="linearView mobile">
                        {this.getMobileLineView(dataPart)}
                    </Row>
                </Row>
            )
        })
    }

    getComputerView(): React.ReactNode {
        return (
            <div className="leftAndRightView">
                {this.props.pageData?.data.map((dataPart, index) => {
                    if (index % 2 === 0) {
                        return (
                            <Row
                                className="backgroundLine"
                                style={index == 0 ? { paddingTop: '0' } : {}}
                            >
                                <Row className="linearView">
                                    {this.getInnerRightSideView(
                                        index,
                                        dataPart
                                    )}
                                </Row>
                            </Row>
                        )
                    } else {
                        return (
                            <Row className="coloredBackgroundLine">
                                <Row className="linearView">
                                    {this.getInnerLeftSideView(dataPart)}
                                </Row>
                            </Row>
                        )
                    }
                })}
            </div>
        )
    }

    render(): React.ReactNode {
        const pageHeader =
            this.props.pageData?.bannerBlobName !== undefined &&
            !this.isMobile ? (
                <MediaBanner
                    mediaSrc={AzureBlobStorage.getBlobUrl(
                        this.props.pageData.bannerBlobName
                    )}
                    text={this.props.pageName}
                />
            ) : (
                <Row className="pageTitle">
                    <h4>{this.props.pageName}</h4>
                </Row>
            )
        return (
            <>
                <Row>{pageHeader}</Row>
                {this.isMobile ? this.getMobileVIew() : this.getComputerView()}
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
