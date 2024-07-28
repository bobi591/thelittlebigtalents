import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { TypeColumn } from '@inovua/reactdatagrid-community/types'
import { ReactElement, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Backend from '../../../datasource/Backend'
import Booking from '../../../datasource/models/Booking'

type BookingsDatasource = {
    id: number
    isContacted: ReactElement
    notes: ReactElement
} & Omit<Booking, 'id' | 'typeName' | 'isContacted' | 'notes'>

export const BookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [isDataChanged, setIsDataChanged] = useState<boolean>(false)

    useEffect(() => {
        Backend.getBookings().then((data) => {
            setBookings(data)
        })
    }, [])

    const updateBookings = (updatedBooking: Booking) => {
        const clonedBookings: Booking[] = JSON.parse(JSON.stringify(bookings))
        const index = clonedBookings.findIndex(
            (e) => e.id === updatedBooking.id
        )
        clonedBookings[index] = updatedBooking
        setBookings(clonedBookings)
    }

    const onClickIsContactedCheckbox = async (booking: Booking) => {
        booking.isContacted = !booking.isContacted
        setIsDataChanged(true)
        updateBookings(booking)
    }
    const onChangeNotesInput = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        booking: Booking
    ) => {
        booking.notes = event.target.value
        setIsDataChanged(true)
        updateBookings(booking)
    }
    const onClickSave = async () => {
        bookings.forEach(async (booking) => {
            await Backend.updateJson({
                className: 'com.thelittlebigtalents.backend.model.impl.Booking',
                json: JSON.stringify(booking),
            })
        })
        setIsDataChanged(false)
    }
    const createDatasource = () => {
        const datasource: BookingsDatasource[] = []
        bookings.map((value, index) => {
            const {
                parentName,
                parentEmail,
                parentPhone,
                studentName,
                studentAge,
                isContacted,
                notes,
            } = value
            datasource.push({
                id: index,
                parentName,
                parentEmail,
                parentPhone,
                studentName,
                studentAge,
                isContacted: (
                    <Form.Check
                        type="checkbox"
                        defaultChecked={isContacted}
                        onClick={async () => onClickIsContactedCheckbox(value)}
                    ></Form.Check>
                ),
                notes: (
                    <Form.Control
                        value={notes}
                        onChange={(event) => onChangeNotesInput(event, value)}
                    ></Form.Control>
                ),
            })
        })
        return datasource
    }
    const gridStyle = { minHeight: 550 }
    const columns: TypeColumn[] = [
        {
            name: 'parentName',
            header: 'Име на родител',
            defaultFlex: 1,
        },
        {
            name: 'parentEmail',
            header: 'Имейл адрес',
            defaultFlex: 1,
        },
        {
            name: 'parentPhone',
            header: 'Телефон',
            defaultFlex: 1,
        },
        {
            name: 'studentName',
            header: 'Име на ученик',
            defaultFlex: 1,
        },
        {
            name: 'studentAge',
            header: 'Възраст на ученик',
            type: 'number',
            defaultFlex: 1,
        },
        {
            name: 'isContacted',
            header: 'Осъществен контакт',
            defaultFlex: 1,
        },
        {
            name: 'notes',
            header: 'Записки',
            defaultFlex: 1,
        },
    ]
    return (
        bookings && (
            <Container className="data-editor-root" fluid="lg">
                <div className="text-center title">
                    <h4>Малките Големи Таланти - Форма за записване</h4>
                </div>
                <Row className="justify-content-md-center text-center buttonGroup">
                    <Col>
                        <Button
                            variant="success"
                            onClick={onClickSave}
                            disabled={!isDataChanged}
                        >
                            Запази
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Row className="pb-4">
                        <Col>
                            <ReactDataGrid
                                idProperty="id"
                                columns={columns}
                                dataSource={createDatasource()}
                                style={gridStyle}
                            />
                        </Col>
                    </Row>
                </Row>
            </Container>
        )
    )
}

export default BookingsPage
