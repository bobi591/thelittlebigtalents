import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
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

    getInnerRightSideView(index: number, dataPart: InformationPageDataPart) {
        const isImageExisting = dataPart.imageSrc !== undefined
        const isTextExisting = dataPart.text !== undefined
        const result = []
        if (isImageExisting) {
            result.push(
                <Col className="picture">
                    <img src={dataPart.imageSrc} />
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
                        <p>{dataPart.text}</p>
                    </Row>
                </Col>
            )
        }
        return result
    }

    getInnerLeftSideView(dataPart: InformationPageDataPart) {
        const isImageExisting = dataPart.imageSrc !== undefined
        const isTextExisting = dataPart.text !== undefined
        const result = []
        if (isTextExisting) {
            result.push(
                <Col className="text left">
                    <Row>
                        <p>{dataPart.text}</p>
                    </Row>
                </Col>
            )
        }
        if (isImageExisting) {
            result.push(
                <Col className="picture">
                    <img src={dataPart.imageSrc} />
                </Col>
            )
        }
        return result
    }

    render(): React.ReactNode {
        const pageHeader =
            this.props.pageData?.bannerMediaSrc !== undefined ? (
                <MediaBanner
                    mediaSrc={this.props.pageData.bannerMediaSrc}
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
                <div className="leftAndRightView">
                    {this.props.pageData?.data.map((dataPart, index) => {
                        if (index % 2 === 0) {
                            return (
                                <Row
                                    className="backgroundLine"
                                    style={
                                        index == 0 ? { paddingTop: '0' } : {}
                                    }
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
