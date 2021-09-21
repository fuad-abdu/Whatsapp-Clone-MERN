import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import './Login.css'
import { provider } from '../../firebase';
import { getAuth, signInWithPopup } from '@firebase/auth';
import { AuthContext } from '../../Store/Context';

function Login() {

    const { setUser } = useContext(AuthContext)

    const signIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider).then(result => {
            setUser(result.user);
        }).catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="./login_logo.png" alt="" />
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button onClick={signIn} >Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
