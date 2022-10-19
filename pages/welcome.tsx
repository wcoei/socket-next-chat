import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { useUserContext } from '../context/user'
import { useRouter } from 'next/router'

const Welcome: NextPage = () => {
    const [regUser, setRegUser] = useState('')
    const { setUser } = useUserContext()!;
    const router = useRouter()

    const registerUser = () => {
        console.log(regUser)
        setUser(regUser)

        router.push('/chat')
    }

    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <input value={regUser} onChange={e => setRegUser(e.target.value)} placeholder="Enter your name"/>
                <button onClick={registerUser}>
                    Register
                </button>
            </div>
        </main>
    )
}

export default Welcome
