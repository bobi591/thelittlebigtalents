import React from 'react'
import { Carousel, Row } from 'react-bootstrap'
import { isSubPageLoading, provideError } from '../../AppSlice'
import Backend from '../../datasource/Backend'
import InformationPageGalleryBottomData from '../../datasource/models/InformationPageGalleryBottomData'
import { AppStore } from '../../ReduxStore'
import PageProps from './PageProps'

type PageComponentState = {
    pageData?: InformationPageGalleryBottomData
}

export default class InformationPageGalleryBottom extends React.Component<PageProps> {
    constructor(props: PageProps) {
        super(props)
    }

    state: PageComponentState = {
        pageData: undefined,
    }

    async componentDidMount() {
        AppStore.dispatch(isSubPageLoading(true))
        try {
            const retrievedPageData = await Backend.getInformationPageGalleryBottomData(
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
