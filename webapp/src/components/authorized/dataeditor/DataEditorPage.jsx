import clone from 'just-clone'
import { useEffect } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import JsonEditor from 'react-json-editor-ui'
import { connect } from 'react-redux'
import { provideError } from '../../../AppSlice'
import Backend from '../../../datasource/Backend'
import { useAppDispatch } from '../../../ReduxStore'
import { showToast } from '../AuthorizedAppSlice'
import {
    fetchEditPageActions,
    updateData,
    updateJsonEditorKey,
    updateOriginalData,
    updateSelectedDataType,
} from './DataEditorPageSlice'

export const DataEditorPage = (props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchEditPageActions())
    }, [])

    const onSelectDataType = async (dataType, asyncBackendFunction) => {
        let retrievedData
        if (dataType === 'Navbar' || dataType === 'Footer') {
            retrievedData = await asyncBackendFunction()
        } else {
            retrievedData = await asyncBackendFunction(dataType)
        }
        dispatch(updateSelectedDataType(dataType))
        // Deep copy with Json Parse & Json Stringify
        dispatch(updateOriginalData(clone(retrievedData)))
        dispatch(updateData(clone(retrievedData)))
        dispatch(updateJsonEditorKey())
    }

    const onJsonDataUpdate = async (data) => {
        //Avoid error 'unable to set value in readonly property'
        dispatch(updateData(clone(data)))
    }

    const onSaveClick = async () => {
        try {
            const validationResponse = await Backend.updateJson({
                className: props.data.typeName,
                json: JSON.stringify(props.data),
            })
            dispatch(
                showToast({
                    header: 'Успешна валидация 🥳',
                    message: validationResponse,
                })
            )
            dispatch(updateOriginalData(props.data))
        } catch (error) {
            dispatch(
                showToast({
                    header: 'Неуспешна валидация 😢',
                    message: error.response.data,
                })
            )
        } finally {
            dispatch(updateJsonEditorKey())
        }
    }

    const onResetClick = () => {
        dispatch(updateData(clone(props.originalData)))
        dispatch(updateJsonEditorKey())
    }

    const getPages = () => {
        const { editPagesActions } = props
        const pages = editPagesActions ? [...editPagesActions.keys()] : []
        return pages
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
                        onClick={async () => await onSaveClick()}
                        disabled={
                            JSON.stringify(props.data) ===
                            JSON.stringify(props.originalData)
                        }
                    >
                        Запази
                    </Button>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Избери данни
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {getPages().map((x) => {
                                return (
                                    <Dropdown.Item
                                        onClick={async () =>
                                            await onSelectDataType(
                                                x,
                                                props.editPagesActions.get(x)
                                            )
                                        }
                                    >
                                        {x}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Button variant="warning" onClick={() => onResetClick()}>
                        Нулирай
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Row className="pb-4">
                    <Col>
                        {props.data && (
                            <>
                                <p>{props.data.typeName}</p>
                                <div className="editor">
                                    <JsonEditor
                                        key={props.jsonEditorKey}
                                        data={props.data}
                                        onChange={async (data) => {
                                            await onJsonDataUpdate(data)
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        editPagesActions: state.dataEditorPage.editPagesActions,
        jsonEditorKey: state.dataEditorPage.jsonEditorKey,
        selectedDataType: state.dataEditorPage.selectedDataType,
        data: state.dataEditorPage.data,
        originalData: state.dataEditorPage.originalData,
        error: state.app.error,
    }
}

const mapDispatchToProps = () => ({
    updateJsonEditorKey,
    updateSelectedDataType,
    updateData,
    updateOriginalData,
    provideError,
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(DataEditorPage)
