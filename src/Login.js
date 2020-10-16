import React, { useEffect } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import * as firebase from 'firebase'
import { Modal, Button } from 'antd'

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
}

const Login = ({ onLoggedIn, onLoggedOut, onLoginFailed, requireLogin }) => {
    useEffect(() => {
        return firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    onLoggedIn(user)
                } else {
                    onLoggedOut()
                }
            }
        )
    })

    console.log("rr", requireLogin)
    return <>

        <Modal
            title="Pick your login method"
            visible={requireLogin}
            onOk={() => {

            }}
            confirmLoading={() => {

            }}
            onCancel={() => {
                console.log("cancel")
                onLoginFailed()
            }}
            footer={null}
        >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

            <Button type="ghost" onClick={() => {
                onLoginFailed()
            }}>Cancel</Button>

        </Modal>

    </>

}

export default Login
