import { Select } from 'antd'
import React from 'react'

import Prenoms from "../Prenoms.json"

let langOptions = []

export const getLanguagesOptions = () => {
    if(langOptions.length > 0) {
        return langOptions
    }
    const languages = []
    let innerLanguage = []

    for (let i = 0, len = Prenoms.length; i < len; i++) {
        innerLanguage = Prenoms[i].language.split(', ')

        for (let j = 0, length = innerLanguage.length; j < length; j++) {
            if (!languages.includes(innerLanguage[j]) && innerLanguage[j].length > 1) {
                languages.push(innerLanguage[j])
            }
        }
    }

    languages
        .sort()
        .forEach(lang => {
            langOptions.push(<Select.Option key={lang}>{lang}</Select.Option>)
        })

    return langOptions
}

let letterList = []
export const getLetterList = () => {
    if(letterList.length >0) {
        return letterList
    }

    const letters = Prenoms.reduce((acc, name) => {
        name.name.split("").forEach(letter => {
            if(!acc[letter]) {
                acc[letter] = 1
            }
        })
        return acc
    }, {})

    letterList= Object.keys(letters).filter(isLetter)
    return letterList
}
function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
}
