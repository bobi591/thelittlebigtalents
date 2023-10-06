import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { JsonTree } from 'react-editable-json-tree'
import '../../App.css'
import Backend from '../../datasource/Backend'

export default class DataEditorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isValidating: false,
            selectedDataType: undefined,
            data: undefined,
            originalData: undefined,
            error: undefined,
        }
    }

    async onSelectDataType(dataType) {
        if (dataType === 'Navbar') {
            const retrievedData = await Backend.getNavbar()
            this.setState({
                ...this.state,
                selectedDataType: dataType,
                //Deep copy here!
                data: JSON.parse(JSON.stringify(retrievedData)),
                //Deep copy here!
                originalData: JSON.parse(JSON.stringify(retrievedData)),
            })
        }
        if (dataType === 'Footer') {
            const retrievedData = await Backend.getFooter()
            this.setState({
                ...this.state,
                selectedDataType: dataType,
                //Deep copy here!
                data: JSON.parse(JSON.stringify(retrievedData)),
                //Deep copy here!
                originalData: JSON.parse(JSON.stringify(retrievedData)),
            })
        }
    }

    onFullyUpdate(updatedData) {
        this.setState({
            ...this.state,
            data: updatedData,
        })
    }

    onSaveClick() {
        Backend.sendJsonToValidation({
            className: this.state.data.className,
            json: JSON.stringify(this.state.data),
        })
            .then((response) => {
                window.alert(String(response))
                this.setState({
                    ...this.state,
                    isValidating: false,
                })
            })
            .catch((error) => window.alert(error))
        this.setState({
            ...this.state,
            isValidating: true,
        })
    }

    render() {
        let jsonEditor = <></>
        if (this.state.data !== undefined) {
            jsonEditor = (
                <>
                    <p>{this.state.data.className}</p>
                    <div className="editor">
                        <JsonTree
                            editButtonElement={
                                <Button variant="success">✔</Button>
                            }
                            cancelButtonElement={
                                <Button variant="warning">✕</Button>
                            }
                            onFullyUpdate={(data) => this.onFullyUpdate(data)}
                            data={this.state.data}
                        />
                    </div>
                </>
            )
        }
        return (
            <Container className="dataEditorRoot" fluid="md">
                <div className="text-center title">
                    <h4>Малките Големи Таланти - Промяна на данни</h4>
                </div>
                <Row className="justify-content-md-center text-center buttonGroup">
                    <Col>
                        <Button
                            variant="success"
                            onClick={() => this.onSaveClick()}
                            disabled={
                                JSON.stringify(this.state.data) ===
                                JSON.stringify(this.state.originalData)
                            }
                        >
                            Валидирай
                        </Button>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="primary"
                                id="dropdown-basic"
                            >
                                Избери данни
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={async () =>
                                        await this.onSelectDataType('Navbar')
                                    }
                                >
                                    Навигация
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={async () =>
                                        await this.onSelectDataType('Footer')
                                    }
                                >
                                    Футер
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Button variant="warning">Нулирай</Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>{jsonEditor}</Col>
                </Row>
            </Container>
        )
    }
}
