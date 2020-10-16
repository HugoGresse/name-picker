import React, { useState } from 'react'
import NamePicker from './NamePicker'
import "./App.css"
import Login from './Login'
import "./firebase"
import * as firebase from 'firebase'

const App = () => {
    const [requireLogin, setRequireLogin] = useState(false)
    const [user, setUser] = useState(firebase.auth().currentUser)

    return <>
        <Login
            requireLogin={requireLogin}
            onLoginFailed={() => setRequireLogin(false)}
            onLoggedIn={(user) => {
                setRequireLogin(false)
                setUser(user)
            }}
            onLoggedOut={() => {
                setUser(null)
            }}
        />
        <NamePicker
            isLoggedIn={!!user}
            onLoginRequired={(isRequired) => {
                if (isRequired) {
                    setRequireLogin(isRequired)
                } else {
                    firebase.auth().signOut()
                }
            }}
        />

    </>

}

export default App
