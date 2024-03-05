import { animated, useTransition } from '@react-spring/web'
import { ReactNode } from 'react'

export const OpacityTransitionOverlay = (props: { children: ReactNode }) => {
    const childrenTransitions = useTransition(props.children, {
        from: { opacity: 0.2 },
        enter: { opacity: 1 },
        config: { duration: 500 },
    })

    const childrenWithTransition = childrenTransitions((style, item) => (
        <animated.div style={{ ...style }}>{item}</animated.div>
    ))

    return <>{childrenWithTransition}</>
}
