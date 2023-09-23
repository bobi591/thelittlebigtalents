import React from "react";
import PageProps from "./PageProps";
import NavbarComponent from "../navbar/NavbarComponent";
import InformationPageData from "../../datasource/models/InformationPageData";
import Backend from "../../datasource/Backend";
import { Col, Row } from "react-bootstrap";
import FooterComponent from "../footer/FooterComponent";
import ErrorCollector from "../../ErrorCollector";

type PageComponentState = {
    pageData?: InformationPageData;
}

export default class InformationPage extends React.Component<PageProps> {
    constructor(props: PageProps) {
        super(props);
    }

    state: PageComponentState = {
        pageData: undefined,
    }

    componentDidMount(): void {
        Backend.getInformationPageData(this.props.pageName).then(value => this.setState({
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
                    <div className="leftAndRightView">
                    {
                        this.state.pageData!.data.map((dataPart, index) => {
                            if(index%2===0) {
                                return(
                                    <Row className="backgroundLine">
                                        <Row className="linearView">
                                            <Col className="picture">
                                                <img src={dataPart.imageSrc}/>
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
                            }
                            else {
                                return(
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
                                                <img src={dataPart.imageSrc}/>
                                            </Col>
                                        </Row>
                                    </Row>
                                )
                            }
                        })
                    }
                    </div>
                </>
            )
        }
    }
}