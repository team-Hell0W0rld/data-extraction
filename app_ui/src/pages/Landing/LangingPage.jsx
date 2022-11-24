import styles from './LandingPage.module.css'

import LoginForm from './Forms/LoginForm/LoginForm'
import SignupForm from './Forms/SignupForm/SignupFrom'
import { Routes, Route, useLocation } from 'react-router-dom'

const LandingPage = () => {
    let location = useLocation();
    return (
        <div className={styles.Container}>
            <div className={styles.Image}></div>
            <div className={styles.Form}>
                <Routes location={location}>
                    <Route index element={<LoginForm></LoginForm>}></Route>
                    <Route path="/signup" element={<SignupForm></SignupForm>}></Route>
                </Routes>
                
            </div>

        </div>
    )
}

export default LandingPage;

