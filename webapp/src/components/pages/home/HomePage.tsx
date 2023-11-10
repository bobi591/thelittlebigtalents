import React from 'react'
import { Button, Card, Carousel, Modal } from 'react-bootstrap'
import ErrorBoundaryComponentState from '../../../AppComponentProps'

type AppState = {
    showBookLessonModal: boolean
}

export default class App extends React.Component {
    state: AppState & ErrorBoundaryComponentState = {
        showBookLessonModal: false,
        error: undefined,
    }

    private showBookLessonModal(show: boolean) {
        this.setState({ ...this.state, showBookLessonModal: show })
    }

    carouselOverlay = (
        <div className="carousel-overlay">
            <Card className="carousel-card text-white border-0">
                <Card.Body>
                    <Card.Title as="h4" className="uppercasetext boldtext">
                        Добре дошли!
                    </Card.Title>
                    <Card.Text>уроци за начинаещи и напреднали</Card.Text>
                    <Button
                        variant="light"
                        style={{ margin: '2%' }}
                        onClick={() => this.showBookLessonModal(true)}
                    >
                        Запиши урок
                    </Button>
                    <Button variant="light" style={{ margin: '2%' }}>
                        Обади се
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )

    bookLessonModal = (
        <Modal
            show={this.state.showBookLessonModal}
            onHide={() => this.showBookLessonModal(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Don not even try to
                press escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => this.showBookLessonModal(false)}
                >
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    )

    render(): React.ReactNode {
        return (
            <>
                {this.bookLessonModal}
                <div
                    style={{
                        height: '80vh',
                        width: '100%',
                        left: '0%',
                        position: 'relative',
                    }}
                >
                    {this.carouselOverlay}
                    <Carousel controls={false} interval={5000} wrap={true}>
                        <Carousel.Item>
                            <img
                                className="carousel-picture"
                                src="/carousel/3.jpg"
                                style={{
                                    objectFit: 'cover',
                                    height: '80vh',
                                    width: '100vw',
                                }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="carousel-picture"
                                src="/carousel/1.jpg"
                                style={{
                                    objectFit: 'cover',
                                    height: '80vh',
                                    width: '100vw',
                                }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="carousel-picture"
                                src="/carousel/2.jpg"
                                style={{
                                    objectFit: 'cover',
                                    height: '80vh',
                                    width: '100vw',
                                }}
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </>
        )
    }
}
