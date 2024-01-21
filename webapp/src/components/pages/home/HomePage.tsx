import React from 'react'
import { Button, Card, Carousel, Modal } from 'react-bootstrap'
import ErrorBoundaryComponentState from '../../../AppComponentProps'
import AzureBlobStorage from '../../../datasource/AzureBlobStorage'

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
                        Впуснете се в света на музиката!
                    </Card.Title>
                    <Card.Text>с уроци за начинаещи и напреднали</Card.Text>
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
                                src={AzureBlobStorage.getBlobUrl(
                                    'home-carousel-3.jpg'
                                )}
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
                                src={AzureBlobStorage.getBlobUrl(
                                    'home-carousel-1.jpg'
                                )}
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
                                src={AzureBlobStorage.getBlobUrl(
                                    'home-carousel-2.jpg'
                                )}
                                style={{
                                    objectFit: 'cover',
                                    height: '80vh',
                                    width: '100vw',
                                }}
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div
                    className="d-flex-inlne justify-content-center homepage-information gray-background"
                >
                    <div
                        className="justify-content-center homepage-information-text"
                    >
                        <h5>Готови ли сте за Вашия Музикален Път?</h5>
                        <p>
                            Музикален Център "Малките Големи Таланти" е мястото,
                            в което ние вярваме, че всяко дете е уникално, и
                            музиката е ключът за разкриване на неговия
                            потенциал. Ние създаваме образователна среда, в
                            която уникалността на всеки ученик се цени и
                            развива!
                        </p>
                    </div>
                </div>
                <div
                    className="d-flex-inlne justify-content-center homepage-information"
                >
                    <div
                        className="justify-content-center homepage-information-text"
                    >
                        <h5>Какво ни прави уникални?</h5>
                        <p>
                            Нашата програма не се ограничава само до
                            техническите аспекти на музикалното обучение.
                            Вярваме в индивидуалния подход и поощряваме
                            творческото изразяване. Преподавателите ни не само
                            предават знания, но и откриват и развиват уникалните
                            музикални способности на всяко дете.
                        </p>
                    </div>
                </div>

                <div
                    className="d-flex-inlne justify-content-center homepage-information gray-background"
                >
                    <div
                        className="justify-content-center homepage-information-text"
                    >
                        <h5>Нашата история</h5>
                        <p>
                            В края на 2018 година, се роди идеята за Музикален
                            Център "Малките Големи Таланти". Започнахме с малко
                            вокално студио, в което се разкриваха и обогатяваха
                            гласовете на нашите първи ученици. Страстта към
                            музиката и желанието да се сподели това вдъхновение
                            станаха основата на музикалния център.
                            <br />
                        </p>
                        <p>
                            С нарастването на интереса и успеха на нашите
                            вокалисти, школата се разраства и предприема нова
                            стъпка - обучение по пиано. Това допълнение позволи
                            на учениците да разширят своите музикални хоризонти
                            и да се изразяват чрез инструментална музика.
                            <br />
                        </p>
                        <p>
                            След като първите ни вокални таланти постигнаха
                            значителен успех на различни конкурси, беше ясно, че
                            имаме пред себе си нещо специално. Това ни вдъхнови
                            и задължи да създадем официално Музикален Център
                            "Малките Големи Таланти", както и да открием класове
                            по барабани и китара. От този момент, нашата мисия е
                            да подготвяме и вдъхновяваме младите таланти да
                            постигат върхови резултати в света на музиката и
                            изкуствата.
                            <br />
                        </p>
                    </div>
                </div>
            </>
        )
    }
}
