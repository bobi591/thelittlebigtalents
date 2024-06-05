import React from 'react'
import { Button, Card, Carousel, Form, Modal } from 'react-bootstrap'
import ErrorBoundaryComponentState from '../../../AppComponentProps'
import AzureBlobStorage from '../../../datasource/AzureBlobStorage'
import Backend from '../../../datasource/Backend'

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

    onBookLessonModalSubmit = async (
        event: React.SyntheticEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        const { currentTarget } = event
        const formElements =
            currentTarget.elements as typeof currentTarget.elements & {
                parentName: { value: string }
                parentEmail: { value: string }
                parentPhone: { value: string }
                studentName: { value: string }
                studentAge: { value: string }
            }
        await Backend.createJson({
            className: 'com.thelittlebigtalents.backend.model.impl.Booking',
            json: JSON.stringify({
                parentName: formElements.parentName.value,
                parentEmail: formElements.parentEmail.value,
                parentPhone: formElements.parentPhone.value,
                studentName: formElements.studentName.value,
                studentAge: formElements.studentAge.value,
                isContacted: false,
                notes: 'Няма',
            }),
        })
        this.showBookLessonModal(false)
    }

    bookLessonModal = (
        <Modal
            show
            onHide={() => this.showBookLessonModal(false)}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма за записване
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.onBookLessonModalSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Име на родител</Form.Label>
                        <Form.Control
                            id="parentName"
                            required
                            type="text"
                            placeholder="име и фамилия"
                            autoFocus
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля въведете име на родител.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Имейл адрес</Form.Label>
                        <Form.Control
                            id="parentEmail"
                            required
                            type="email"
                            placeholder="name@example.com"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля въведете имейл адрес.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            id="parentPhone"
                            required
                            type="tel"
                            placeholder="012 345 6789"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля въведете телефон за връзка.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Име на ученик</Form.Label>
                        <Form.Control
                            id="studentName"
                            required
                            type="text"
                            placeholder="име и фамилия на ученик"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля въведете име и фамилия на ученик.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Възраст на ученик</Form.Label>
                        <Form.Control
                            id="studentAge"
                            required
                            type="number"
                            placeholder="възраст на ученик"
                            autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля въведете възраст на ученик.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => this.showBookLessonModal(false)}
                    >
                        Отмяна
                    </Button>
                    <Button type="submit" variant="primary">
                        Изпрати
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )

    render(): React.ReactNode {
        const { showBookLessonModal } = this.state
        return (
            <>
                {showBookLessonModal && this.bookLessonModal}
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
                                    'home-carousel-4.jpg'
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
                <div className="d-flex-inlne justify-content-center homepage-information">
                    <div className="justify-content-center homepage-information-text">
                        <h5>Готови ли сте за Вашия Музикален Път?</h5>
                        <p>
                            В Музикален Център "Малките Големи Таланти" вярваме,
                            че всяко дете е уникално и музиката е ключът за
                            разкриване на неговия потенциал. Ние създаваме
                            образователна среда, в която уникалността на всеки
                            ученик се цени и развива!
                        </p>
                    </div>
                </div>
                <div className="d-flex-inlne justify-content-center homepage-information gray-background">
                    <div className="justify-content-center homepage-information-text">
                        <h5>Нашата история...</h5>
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
