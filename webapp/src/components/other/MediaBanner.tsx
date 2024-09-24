import React, { useCallback, useMemo } from 'react'
import { OpacityTransitionOverlay } from '../overlays/transition/OpacityTransitionOverlay'

type MediaBannerProps = {
    mediaSrc: string
    text: string
}

const MediaBanner: React.FC<MediaBannerProps> = ({ mediaSrc, text }) => {
    const isVideo = useCallback((file: string) => {
        const videoFormats = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4']
        return videoFormats.some((format) => file.includes(format))
    }, [])

    const mediaComponent = useMemo(() => {
        const media = isVideo(mediaSrc) ? (
            <video
                className="media-banner"
                src={mediaSrc}
                autoPlay={true}
                loop={true}
                muted={true}
                preload="auto"
            />
        ) : (
            <img loading="eager" className="media-banner" src={mediaSrc} />
        )

        return (
            <div className="media-banner-container">
                <OpacityTransitionOverlay duration={1500}>
                    <div className="media-banner-container-overlay">
                        {media}
                    </div>
                </OpacityTransitionOverlay>
                <h1 className="media-banner-text h4">{text}</h1>
            </div>
        )
    }, [mediaSrc, text, isVideo])

    return mediaComponent
}

export default MediaBanner
