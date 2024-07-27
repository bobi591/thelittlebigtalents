import { animated, useTransition } from '@react-spring/web'
import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

import { connect } from 'react-redux'
import {
    provideFooterData,
    provideNavbarData,
    setLandingAnimationSeen,
} from '../../../AppSlice'
import Backend from '../../../datasource/Backend'
import FooterData from '../../../datasource/models/FooterData'
import NavbarData from '../../../datasource/models/NavbarData'
import { AppState, useAppDispatch } from '../../../ReduxStore'
import styles from './styles.module.css'

type LoadingOverlayProps = {
    children: ReactNode
    navbarData?: NavbarData
    footerData?: FooterData
    isLandingAnimationSeen?: boolean
}

function LoadingOverlay({
    footerData,
    navbarData,
    isLandingAnimationSeen,
    children,
}: LoadingOverlayProps) {
    const dispatch = useAppDispatch()
    const ref = useRef<ReturnType<typeof setTimeout>[]>([])
    const [items, set] = useState<string[] | ReactNode>([])
    const [hideOverlay, setHideOverlay] = useState<boolean>(false)

    const isDataLoaded = useMemo(() => {
        return Boolean(footerData) && Boolean(navbarData)
    }, [footerData, navbarData])

    const landingTransitions = useTransition(items, {
        from: {
            opacity: 0,
            height: 0,
            innerHeight: 0,
            transform: 'perspective(600px) rotateX(0deg)',
            color: '#Eacc62',
        },
        enter: [
            { opacity: 1, height: 80, innerHeight: 80 },
            {
                transform: 'perspective(600px) rotateX(180deg)',
                color: '#6ae8c5',
            },
            { transform: 'perspective(600px) rotateX(0deg)' },
        ],
        leave: [
            { color: '#5E78C1' },
            { innerHeight: 0 },
            { opacity: 0, height: 0 },
        ],
        update: { color: '#F3d36a' },
    })

    const reset = useCallback(() => {
        ref.current.forEach(clearTimeout)
        ref.current = []
        set([])
        ref.current.push(setTimeout(() => set(['Малките', 'Таланти']), 500))
        ref.current.push(setTimeout(() => set(['Големи', 'Таланти']), 2000))
        ref.current.push(setTimeout(() => set([]), 4000))
        ref.current.push(
            setTimeout(() => {
                setHideOverlay(true)
                setLandingAnimationSeen(true)
            }, 4500)
        )
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
        <>
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
                        <p>{item}</p>
                    </animated.div>
                </animated.div>
            ))}
        </>
    )

    const loadingOverlayContent = (
        <div className={styles.container} hidden={hideOverlay}>
            <div className={styles.main}>{landingAnimation}</div>
        </div>
    )

    return (
        <>
            {!hideOverlay && !isLandingAnimationSeen ? (
                loadingOverlayContent
            ) : (
                <>{children}</>
            )}
        </>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        footerData: state.app.footerData,
        navbarData: state.app.navbarData,
        isLandingAnimationSeen: state.app.isLandingAnimationSeen,
    }
}

const mapDispatchToProps = () => ({
    provideFooterData,
    provideNavbarData,
    setLandingAnimationSeen,
})

export default connect(mapStateToProps, mapDispatchToProps())(LoadingOverlay)
