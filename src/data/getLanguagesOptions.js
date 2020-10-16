import { Select } from 'antd'
import React from 'react'

import Prenoms from "../Prenoms.json"

export const getLanguagesOptions = () => {
    const languages = []
    const options = []
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
            options.push(<Select.Option key={lang}>{lang}</Select.Option>)
        })

    return options

}
