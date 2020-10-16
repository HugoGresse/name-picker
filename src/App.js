import React, { useState } from 'react'
import NamePicker from './NamePicker'
import "./App.css"
import Login from './Login'
import { authInstance } from './firebase/firebase'

const App = () => {
    const [requireLogin, setRequireLogin] = useState(false)
    const [user, setUser] = useState(authInstance.currentUser)

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
            userId={user && user.uid }
            onLoginRequired={(isRequired) => {
                if (isRequired) {
                    setRequireLogin(isRequired)
                } else {
                    authInstance.signOut()
                }
            }}
        />

    </>

}

export default App
