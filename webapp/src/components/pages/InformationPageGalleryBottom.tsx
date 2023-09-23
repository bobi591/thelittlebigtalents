import React from "react";
import PageProps from "./PageProps";
import InformationPageGalleryBottomData from "../../datasource/models/InformationPageGalleryBottomData";
import Backend from "../../datasource/Backend";
import NavbarComponent from "../navbar/NavbarComponent";
import { Carousel, Row } from "react-bootstrap";
import FooterComponent from "../footer/FooterComponent";
import ErrorCollector from "../../ErrorCollector";

type PageComponentState = {
    pageData?: InformationPageGalleryBottomData;
}

export default class InformationPageGalleryBottom extends React.Component<PageProps> {
    constructor(props: PageProps) {
        super(props);
    }

    state: PageComponentState = {
        pageData: undefined,
    }

    componentDidMount(): void {
        Backend.getInformationPageGalleryBottomData(this.props.pageName).then(value => this.setState({
            pageData: value,
        })).catch((error) => ErrorCollector.addError(error));
    }

    render(): React.ReactNode {
        if(this.state.pageData != undefined) {
            return(
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
                                <Carousel controls={true} interval={5000} wrap={true}>
                                    {
                                        this.state.pageData.galleryImgSrcs.map((imageSrc) => {
                                            return(
                                                <Carousel.Item>
                                                    <img src={imageSrc} />
                                                </Carousel.Item>
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        </Row>
                    </div>
                </>
            )
        }
    }
}