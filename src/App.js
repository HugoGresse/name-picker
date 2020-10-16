import React, { useState } from 'react'
import NamePicker from './NamePicker'
import "./App.css"

const App = () => {
    const [requireLogin, setRequireLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    return <>
        <NamePicker
            isLoggedIn={isLoggedIn}
            onLoginRequired={(isRequired) => {
                setRequireLogin(isRequired)
            }}
        />

    </>

}

export default App
