import React from 'react'
import { Carousel, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import InformationPageGalleryBottomData from '../../../datasource/models/InformationPageGalleryBottomData'
import { AppState } from '../../../ReduxStore'
import PageProps from '../PageProps'

class InformationPageGalleryBottom extends React.Component<
    PageProps<InformationPageGalleryBottomData>
> {
    render(): React.ReactNode {
        return (
            <>
                <Row className="pageTitle">
                    <h4>{this.props.pageName}</h4>
                </Row>
                <div className="textWithGalleryBottomView">
                    <Row>
                        <p>{this.props.pageData!.text}</p>
                    </Row>
                    <Row>
                        <div className="gallery">
                            <Carousel
                                controls={true}
                                interval={5000}
                                wrap={true}
                            >
                                {this.props.pageData!.galleryImgSrcs.map(
                                    (imageSrc) => {
                                        return (
                                            <Carousel.Item>
                                                <img
                                                    src={imageSrc}
                                                    style={{ width: '100%' }}
                                                />
                                            </Carousel.Item>
                                        )
                                    }
                                )}
                            </Carousel>
                        </div>
                    </Row>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        pageData: state.app.informationPageGalleryBottomData,
    }
}

export default connect(mapStateToProps)(InformationPageGalleryBottom)
