import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useUserContext } from '../context/user'
import styles from '../styles/Home.module.css'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const user = useUserContext()?.user ?? ''
    const router = useRouter()
    const url = router.asPath

    useEffect(() => {
        if (url === '/') {
            return
        }
        if (url !== '/welcome' && !user) {
            router.push('/welcome')
            return
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                {children}
            </div>
        </>
    )
}

export default Layout
