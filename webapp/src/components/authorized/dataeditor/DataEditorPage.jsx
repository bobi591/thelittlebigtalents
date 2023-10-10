import clone from 'just-clone'
import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import JsonEditor from 'react-json-editor-ui'
import { connect } from 'react-redux'
import { provideError } from '../../../AppSlice'
import Backend from '../../../datasource/Backend'
import { AppStore } from '../../../ReduxStore'
import { showToast } from '../AuthorizedAppSlice'
import {
    updateData,
    updateJsonEditorKey,
    updateOriginalData,
    updateSelectedDataType,
} from './DataEditorPageSlice'

export class DataEditorPage extends React.Component {
    async onSelectDataType(dataType) {
        if (dataType === 'Navbar') {
            const retrievedData = await Backend.getNavbar()
            AppStore.dispatch(updateSelectedDataType(dataType))
            // Deep copy with Json Parse & Json Stringify
            AppStore.dispatch(updateOriginalData(clone(retrievedData)))
            AppStore.dispatch(updateData(clone(retrievedData)))
        }
        if (dataType === 'Footer') {
            const retrievedData = await Backend.getFooter()
            AppStore.dispatch(updateSelectedDataType(dataType))
            // Deep copy with Json Parse & Json Stringify
            AppStore.dispatch(updateOriginalData(clone(retrievedData)))
            AppStore.dispatch(updateData(clone(retrievedData)))
        }
        AppStore.dispatch(updateJsonEditorKey())
    }

    async onJsonDataUpdate(data) {
        //Avoid error 'unable to set value in readonly property'
        AppStore.dispatch(updateData(clone(data)))
    }

    async onSaveClick() {
        try {
            const validationResponse = await Backend.saveJson({
                className: this.props.data.className,
                json: JSON.stringify(this.props.data),
            })
            AppStore.dispatch(
                showToast({
                    header: 'Успешна валидация 🥳',
                    message: validationResponse,
                })
            )
            AppStore.dispatch(updateOriginalData(this.props.data))
        } catch (error) {
            AppStore.dispatch(
                showToast({
                    header: 'Неуспешна валидация 😢',
                    message: error.response.data,
                })
            )
        } finally {
            AppStore.dispatch(updateJsonEditorKey())
        }
    }

    onResetClick() {
        AppStore.dispatch(updateData(clone(this.props.originalData)))
        AppStore.dispatch(updateJsonEditorKey())
    }

    render() {
        let jsonEditor = <></>
        const modifiedData = this.props.data
        const originalData = this.props.originalData
        if (modifiedData !== undefined) {
            jsonEditor = (
                <>
                    <p>{modifiedData.className}</p>
                    <div className="editor">
                        <JsonEditor
                            key={this.props.jsonEditorKey}
                            data={modifiedData}
                            onChange={async (data) => {
                                await this.onJsonDataUpdate(data)
                            }}
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
                            onClick={async () => await this.onSaveClick()}
                            disabled={
                                JSON.stringify(modifiedData) ===
                                JSON.stringify(originalData)
                            }
                        >
                            Запази
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
                        <Button
                            variant="warning"
                            onClick={() => this.onResetClick()}
                        >
                            Нулирай
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>{jsonEditor}</Col>
                </Row>
            </Container>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        jsonEditorKey: state.dataEditorPage.jsonEditorKey,
        selectedDataType: state.dataEditorPage.selectedDataType,
        data: state.dataEditorPage.data,
        originalData: state.dataEditorPage.originalData,
        error: state.app.error,
    }
}

export const mapDispatchToProps = () => ({
    updateJsonEditorKey,
    updateSelectedDataType,
    updateData,
    updateOriginalData,
    provideError,
})

export default connect(mapStateToProps, mapDispatchToProps)(DataEditorPage)
