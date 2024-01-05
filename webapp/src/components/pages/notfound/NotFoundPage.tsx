import React from 'react'
import AzureBlobStorage from '../../../datasource/AzureBlobStorage'

export default class NotFoundPage extends React.Component {
    render(): React.ReactNode {
        return (
            <div
                style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '20vh',
                }}
            >
                <h3>Упс... нещо се обърка!</h3>
                <p>Страницата която се опитвате да посетите не съществува.</p>
                <img src={AzureBlobStorage.getBlobUrl("error.png")} />
            </div>
        )
    }
}
