import React from 'react'
import { Carousel, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import AzureBlobStorage from '../../../datasource/AzureBlobStorage'
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
                       <div dangerouslySetInnerHTML={{ __html: this.props.pageData!.text }} />
                    </Row>
                    <Row>
                        <div className="gallery">
                            <Carousel
                                controls={true}
                                interval={5000}
                                wrap={true}
                            >
                                {this.props.pageData!.galleryImagesBlobNames.map(
                                    (imageBlobName) => {
                                        return (
                                            <Carousel.Item>
                                                <img
                                                    src={AzureBlobStorage.getBlobUrl(
                                                        imageBlobName
                                                    )}
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
