import React, { useCallback, useMemo, useState } from 'react'
import { OpacityTransitionOverlay } from '../overlays/transition/OpacityTransitionOverlay'

type MediaBannerProps = {
    mediaSrc: string
    text: string
}

const MediaBanner: React.FC<MediaBannerProps> = ({mediaSrc, text}) => {

    const [isMediaBannerLoaded, setIsMediaBannerLoaded] = useState(false)

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
                onLoadedData={() => setIsMediaBannerLoaded(true)}
            /> : <img
            loading='eager'
            className="media-banner"
            src={mediaSrc}
            onLoadedData={() => setIsMediaBannerLoaded(true)}
        />
        return (
            <div className="media-banner-container">
                <div>
                    <OpacityTransitionOverlay duration={650}>{media}</OpacityTransitionOverlay>
                </div>
                <h4 className="media-banner-text">{text}</h4>
            </div>
        )
    }, [mediaSrc, text])

    return mediaComponent
}

export default MediaBanner
