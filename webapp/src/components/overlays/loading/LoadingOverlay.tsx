import { animated, useTransition } from '@react-spring/web'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { OpacityTransitionOverlay } from '../transition/OpacityTransitionOverlay'
import styles from './styles.module.css'
import { provideFooterData, provideNavbarData } from '../../../AppSlice'
import Backend from '../../../datasource/Backend'
import { AppState, useAppDispatch } from '../../../ReduxStore'
import NavbarData from '../../../datasource/models/NavbarData'
import FooterData from '../../../datasource/models/FooterData'
import { connect } from 'react-redux'

type LoadingOverlayProps = {
    children: ReactNode,
    navbarData?: NavbarData,
    footerData?: FooterData,
}

function LoadingOverlay(props: LoadingOverlayProps) {
    const dispatch = useAppDispatch()
    const ref = useRef<ReturnType<typeof setTimeout>[]>([])
    const [items, set] = useState<string[]>([])
    const [hideOverlay, setHideOverlay] = useState<boolean>(false)

    const { footerData, navbarData } = props
    const isDataLoaded = Boolean(footerData) && Boolean(navbarData)

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
                color: '#c2b433',
            },
            { transform: 'perspective(600px) rotateX(0deg)' },
        ],
        leave: [
            { color: '#d7b128' },
            { innerHeight: 0 },
            { opacity: 0, height: 0 },
        ],
        update: { color: '#d7284b' },
    })

    const reset = useCallback(() => {
        ref.current.forEach(clearTimeout)
        ref.current = []
        set([])
        ref.current.push(
            setTimeout(() => set(['Малките', 'Големи', 'Таланти']), 1000)
        )
        ref.current.push(setTimeout(() => set(['Малките', 'Таланти']), 4000))
        ref.current.push(setTimeout(() => set(['Големи', 'Таланти']), 7000))
        ref.current.push(setTimeout(() => set([]), 9000))
        ref.current.push(setTimeout(() => setHideOverlay(true), 10000))
    }, [])

    useEffect(() => {
        reset()
        //Eager load of commonly used data
        if (!isDataLoaded) {
            Backend.getFooter().then((data) =>
                dispatch(provideFooterData(data))
            )
            Backend.getNavbar().then((data) =>
                dispatch(provideNavbarData(data))
            )
        }
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

    return (
        <>
            {!hideOverlay ? (
                landingAnimation
            ) : (
                <OpacityTransitionOverlay>
                    {props.children}
                </OpacityTransitionOverlay>
            )}
        </>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        footerData: state.app.footerData,
        navbarData: state.app.navbarData,
    }
}

const mapDispatchToProps = () => ({
    provideFooterData,
    provideNavbarData,
})

export default connect(mapStateToProps, mapDispatchToProps())(LoadingOverlay)
