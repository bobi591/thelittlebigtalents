import React from 'react'

type MediaBannerProps = {
    mediaSrc: string
    text: string
}

export default class MediaBanner extends React.Component<MediaBannerProps> {
    isImage(file: string) {
        let isImage = false;
        const imageFormats = ['.gif', '.jpg', '.jpeg', '.png']
        imageFormats.forEach((format) => {
            if (file.includes(format)) {
                isImage=true
            }
        })
        return isImage
    }
    isVideo(file: string) {
        const videoFormats = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4']
        let isVideo = false;
        videoFormats.forEach((format) => {
            if (file.includes(format)) {
                isVideo=true
            }
        })
        return isVideo
    }
    render(): React.ReactNode {
        let mediaComponent
        if (this.isVideo(this.props.mediaSrc)) {
            mediaComponent = (
                <div className="media-banner-container">
                    <video
                        className="media-banner"
                        src={this.props.mediaSrc}
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    />
                    <h4 className="media-banner-text">{this.props.text}</h4>
                </div>
            )
        }
        if (this.isImage(this.props.mediaSrc)) {
            mediaComponent = (
                <div className="media-banner-container">
                    <img className="media-banner" src={this.props.mediaSrc} />
                    <h4 className="media-banner-text">{this.props.text}</h4>
                </div>
            )
        }
        return mediaComponent
    }
}
