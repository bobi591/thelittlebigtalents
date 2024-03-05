import { animated, useTransition } from '@react-spring/web'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'

export default function LoadingOverlay(props: { children: ReactNode }) {
    const ref = useRef<ReturnType<typeof setTimeout>[]>([])
    const [items, set] = useState<string[]>([])
    const [hideOverlay, setHideOverlay] = useState<boolean>(false)

    const landingTransitions = useTransition(items, {
        from: {
            opacity: 0,
            height: 0,
            innerHeight: 0,
            transform: 'perspective(600px) rotateX(0deg)',
            color: '#b6a98f',
        },
        enter: [
            { opacity: 1, height: 80, innerHeight: 80 },
            {
                transform: 'perspective(600px) rotateX(180deg)',
                color: '#d7b128',
            },
            { transform: 'perspective(600px) rotateX(0deg)' },
        ],
        leave: [
            { color: '#c2b433' },
            { innerHeight: 0 },
            { opacity: 0, height: 0 },
        ],
        update: { color: '#d7284b' },
    })

    const childrenTransitions = useTransition(props.children, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      config: { duration: 3000 },
    })

    const reset = useCallback(() => {
        ref.current.forEach(clearTimeout)
        ref.current = []
        set([])
        ref.current.push(
            setTimeout(() => set(['Малките', 'Големи', 'Таланти']), 2000)
        )
        ref.current.push(setTimeout(() => set(['Малките', 'Таланти']), 5000))
        ref.current.push(setTimeout(() => set(['Големи', 'Таланти']), 8000))
        ref.current.push(setTimeout(() => setHideOverlay(true), 13000))
    }, [])

    useEffect(() => {
        reset()
        return () => ref.current.forEach(clearTimeout)
    }, [])

    const landingAnimation = (
        <div className={styles.container} hidden={hideOverlay}>
            <div className={styles.main}>
                {landingTransitions(({ innerHeight, ...rest }, item) => (
                    <animated.div
                        className={styles.transitionsItem}
                        style={rest}
                        hidden={hideOverlay}
                    >
                        <animated.div
                            style={{
                                overflow: 'hidden',
                                height: innerHeight,
                            }}
                        >
                            {item}
                        </animated.div>
                    </animated.div>
                ))}
            </div>
        </div>
    )

    const childrenWithTransition = childrenTransitions((style, item) => (
      <animated.div style={{...style}}>
        {item}
      </animated.div>
    ))

    return <>{!hideOverlay ? landingAnimation : childrenWithTransition}</>
}
