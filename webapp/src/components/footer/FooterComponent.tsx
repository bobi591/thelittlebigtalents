import React, { Component } from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import AzureBlobStorage from '../../datasource/AzureBlobStorage'
import FooterData from '../../datasource/models/FooterData'

type FooterComponentProps = {
    footerData: FooterData
}

export default class FooterComponent extends Component<FooterComponentProps> {
    render(): React.ReactNode {
        const footerData = this.props.footerData
        return (
            <footer>
                <Container>
                    <Row>
                        <Col>
                            <h5
                                className="uppercasetext boldtext"
                                style={{ margin: '3%' }}
                            >
                                Музикален Център "Малките Големи Таланти"
                            </h5>
                        </Col>
                    </Row>
                    <Container style={{ width: '50%', marginBottom: '3%' }}>
                        <Row>
                            <Col>
                                <a href={footerData.facebookUrl}>
                                    <img
                                        className="footerSocialIcon"
                                        src={AzureBlobStorage.getBlobUrl(
                                            'facebook-50.png'
                                        )}
                                    />
                                </a>
                            </Col>
                            <Col>
                                <a href={footerData.instagramUrl}>
                                    <img
                                        className="footerSocialIcon"
                                        src={AzureBlobStorage.getBlobUrl(
                                            'instagram-50.png'
                                        )}
                                    />
                                </a>
                            </Col>
                            <Col>
                                <a href={footerData.tiktokUrl}>
                                    <img
                                        className="footerSocialIcon"
                                        src={AzureBlobStorage.getBlobUrl(
                                            'tiktok-50.png'
                                        )}
                                    />
                                </a>
                            </Col>
                            <Col>
                                <a href={footerData.youtubeUrl}>
                                    <img
                                        className="footerSocialIcon"
                                        src={AzureBlobStorage.getBlobUrl(
                                            'youtube-50.png'
                                        )}
                                    />
                                </a>
                            </Col>
                        </Row>
                    </Container>
                    <Container style={{ width: '90%' }}>
                        <Row sm={2}>
                            <Col>
                                <Card className="border-0">
                                    <Card.Body>
                                        <p className="lead">Местоположение</p>
                                        <div className="google-map-code">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.1030854644546!2d23.310713776664706!3d42.70153797116318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8539612d52f7%3A0xa8197aaabca5a46c!2z0JzRg9C30LjQutCw0LvQtdC9INGG0LXQvdGC0YrRgCAi0JzQsNC70LrQuNGC0LUg0JPQvtC70LXQvNC4INCi0LDQu9Cw0L3RgtC4Ig!5e0!3m2!1sbg!2sbg!4v1691528684193!5m2!1sbg!2sbg"
                                                allowFullScreen={false}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                style={{ marginBottom: '1%' }}
                                            ></iframe>
                                        </div>
                                        <Card.Text>
                                            <p
                                                style={{
                                                    marginBottom: '0.5rem',
                                                }}
                                            >
                                                <small>
                                                    ул. „Отец Паисий“ 53
                                                </small>
                                            </p>
                                            <p
                                                style={{
                                                    marginBottom: '0.5rem',
                                                }}
                                            >
                                                <small>
                                                    1303 София център, София
                                                </small>
                                            </p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="border-0">
                                    <Card.Body>
                                        <Card.Text>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="border-0">
                                                    <p className="lead">
                                                        Контакти
                                                    </p>
                                                    <p>
                                                        Телефон:{' '}
                                                        <a
                                                            href={
                                                                'tel:' +
                                                                footerData
                                                                    .contacts
                                                                    .phone
                                                            }
                                                        >
                                                            {
                                                                footerData
                                                                    .contacts
                                                                    .phone
                                                            }
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Email:{' '}
                                                        <a
                                                            href={
                                                                'mailto:' +
                                                                footerData
                                                                    .contacts
                                                                    .email
                                                            }
                                                        >
                                                            {
                                                                footerData
                                                                    .contacts
                                                                    .email
                                                            }
                                                        </a>
                                                    </p>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="border-0">
                                                    <p className="lead">
                                                        Работно време
                                                    </p>
                                                    {footerData.workingHours.hours.map(
                                                        (
                                                            workingHoursText:
                                                                | string
                                                                | number
                                                                | boolean
                                                                | React.ReactElement<
                                                                      any,
                                                                      | string
                                                                      | React.JSXElementConstructor<any>
                                                                  >
                                                                | Iterable<React.ReactNode>
                                                                | React.ReactPortal
                                                                | null
                                                                | undefined
                                                        ) => (
                                                            <p>
                                                                {
                                                                    workingHoursText
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p style={{ fontSize: '1rem' }}>
                                    <small>
                                        <i>Created by Boris Georgiev 2024</i>
                                    </small>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </footer>
        )
    }
}
