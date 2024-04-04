import React, { useCallback, useMemo } from 'react'

type MediaBannerProps = {
    mediaSrc: string
    text: string
}

const MediaBanner: React.FC<MediaBannerProps> = ({mediaSrc, text}) => {

    const isImage = useCallback((file: string) => {
        let isImage = false
        const imageFormats = ['.gif', '.jpg', '.jpeg', '.png']
        imageFormats.forEach((format) => {
            if (file.includes(format)) {
                isImage = true
            }
        })
        return isImage
    }, [])

    const isVideo = useCallback((file: string) => {
        const videoFormats = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4']
        let isVideo = false
        videoFormats.forEach((format) => {
            if (file.includes(format)) {
                isVideo = true
            }
        })
        return isVideo
    }, [])

    const mediaComponent = useMemo(() => {
        const media = isVideo(mediaSrc) ? <video
                className="media-banner"
                src={mediaSrc}
                autoPlay={true}
                loop={true}
                muted={true}
                preload='auto'
            /> : <img
            loading='eager'
            className="media-banner"
            src={mediaSrc}
        />
        return (
            <div className="media-banner-container">
                <div className="media-banner-container-overlay">
                    {media}
                </div>
                <h4 className="media-banner-text">{text}</h4>
            </div>
        )
    }, [mediaSrc, text])

    return mediaComponent
}

export default MediaBanner
