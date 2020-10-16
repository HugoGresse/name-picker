import React, { useEffect } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { Modal, Button } from 'antd'
import { authInstance, auth } from './firebase/firebase'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
}

const Login = ({ onLoggedIn, onLoggedOut, onLoginFailed, requireLogin }) => {
    useEffect(() => {
        return authInstance.onAuthStateChanged(
            (user) => {
                if (user) {
                    onLoggedIn(user)
                } else {
                    onLoggedOut()
                }
            }
        )
    })

    return <>
        <Modal
            title="Pick your login method"
            visible={requireLogin}
            onOk={() => {

            }}
            confirmLoading={() => {

            }}
            onCancel={() => {
                onLoginFailed()
            }}
            footer={null}
        >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authInstance}/>

            <Button type="ghost" onClick={() => {
                onLoginFailed()
            }}>Cancel</Button>

        </Modal>
    </>
}

export default Login
