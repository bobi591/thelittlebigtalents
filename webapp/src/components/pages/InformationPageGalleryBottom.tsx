import React from 'react'
import { Carousel, Row } from 'react-bootstrap'
import ErrorBoundaryComponentState from '../../AppComponentProps'
import Backend from '../../datasource/Backend'
import InformationPageGalleryBottomData from '../../datasource/models/InformationPageGalleryBottomData'
import PageProps from './PageProps'

type PageComponentState = {
    pageData?: InformationPageGalleryBottomData
}

export default class InformationPageGalleryBottom extends React.Component<PageProps> {
    constructor(props: PageProps) {
        super(props)
    }

    state: PageComponentState & ErrorBoundaryComponentState = {
        pageData: undefined,
        error: undefined,
    }

    async componentDidMount() {
        Backend.getInformationPageGalleryBottomData(this.props.pageName)
            .then((value) =>
                this.setState({
                    ...this.state,
                    pageData: value,
                })
            )
            .catch((error) =>
                this.setState({
                    ...this.state,
                    error: error,
                })
            )
    }

    render(): React.ReactNode {
        if (this.state.error !== undefined) {
            throw this.state.error
        }
        if (this.state.pageData != undefined) {
            return (
                <>
                    <Row className="pageTitle">
                        <h4>{this.props.pageName}</h4>
                    </Row>
                    <div className="textWithGalleryBottomView">
                        <Row>
                            <p>{this.state.pageData.text}</p>
                        </Row>
                        <Row>
                            <div className="gallery">
                                <Carousel
                                    controls={true}
                                    interval={5000}
                                    wrap={true}
                                >
                                    {this.state.pageData.galleryImgSrcs.map(
                                        (imageSrc) => {
                                            return (
                                                <Carousel.Item>
                                                    <img src={imageSrc} />
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
}
