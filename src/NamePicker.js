import React, { Component } from "react"
import Prenoms from "./Prenoms.json"
import Layout from "antd/lib/layout"

import NameList from './NameList'
import { Row, Col, Spin } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import SideBar from './SideBar'

const INITIAL_STATE = {
    forbiddenStartLetter: [],
    requiredLetters:[],
    forbiddenLetter: [],
    forbiddenName: '',
    language: [],
    gender: '',
    sortFrequency: '',
    siderCollapsed: false,
    keepAccentOnFilters: true
}

class NamePicker extends Component {

    constructor(props) {
        super(props)

        this.state = INITIAL_STATE
    }

    toggleSider = () => {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        })
    }

    updateFilteredName() {
        let names = []

        names = Prenoms
            // Gender
            .filter(name => {
                if (this.state.gender.length > 0) {
                    return name.gender === this.state.gender
                }
                return true
            })
            // Language
            .filter(item => {
                if (this.state.language.length > 0) {
                    let includes = false
                    this.state.language.forEach(lang => {
                        if (item.language.includes(lang)) {
                            includes = true
                            return
                        }
                    })
                    return includes
                }
                return true
            })
            // First char
            .filter(item => {
                if (this.state.forbiddenStartLetter.length === 0) {
                    return true
                }
                let firstChar = item.name.charAt(0)
                // Remove accent
                firstChar = firstChar.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                // Check if the char is a letter
                // NB: "æ" is actually a letter
                if (!firstChar.toLowerCase().match(/[(a-zA-Zæ)|]/i)) {
                    firstChar = item.name.charAt(1)
                    firstChar = firstChar.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                }
                // Check the final char
                return !this.state.forbiddenStartLetter.includes(firstChar)
            })
            // Middle char
            .filter(item => {
                // Remove accent and remove the first char
                let chars = this.state.keepAccentOnFilters ? item.name.slice(1) : item.name.slice(1).normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                let keep = true
                if(this.state.requiredLetters.length > 0) {
                    this.state.requiredLetters.forEach(letter => {
                        if (!chars.includes(letter)) {
                            keep = false
                        }
                    })
                }
                if (this.state.forbiddenLetter.length > 0) {
                    this.state.forbiddenLetter.forEach(letter => {
                        if (chars.includes(letter)) {
                            keep = false
                        }
                    })
                }
                return keep
            })
            .sort()

        if (this.state.sortFrequency.length > 0) {
            names = names.sort((a, b) => {
                if (this.state.sortFrequency === 'desc') {
                    return b.frequency - a.frequency
                }
                return a.frequency - b.frequency
            })
        }

        return names
    }

    onGenderEnable = (e) => {
        if (!e.target.checked) {
            this.setState({ gender: '' })
        }
    }

    onGenderChanger = (value) => {
        if (value) {
            this.setState({ gender: 'm' })
        } else {
            this.setState({ gender: 'f' })
        }
    }

    onForbiddenLetterChange = (value) => {
        this.setState({ forbiddenLetter: value })
    }

    onRequiredLetterChange = (value) => {
        this.setState({ requiredLetters: value })
    }

    onForbiddenStartLetterChange = (value) => {
        this.setState({ forbiddenStartLetter: value })
    }

    onLanguageChange = (languages) => {
        this.setState({ language: languages })
    }

    onResetClick = () => {
        this.setState(INITIAL_STATE)
    }

    onFrequencyFilterDown = () => {
        this.setState({ sortFrequency: 'desc' })
    }

    onFrequencyFilterUp = () => {
        this.setState({ sortFrequency: 'asc' })
    }

    keepAccentOnFiltersChange = shouldKeep => {
        this.setState({ keepAccentOnFilters: shouldKeep })

    }

    onNamesSave = isSaving => {
        this.setState({
            isSaving: isSaving
        })
    }

    render() {
        return (
            <Layout>
                <Layout>
                    <SideBar
                        siderCollapsed={this.state.siderCollapsed}
                        forbiddenLetter={this.state.forbiddenLetter}
                        forbiddenStartLetter={this.state.forbiddenStartLetter}
                        requiredLetters={this.state.requiredLetters}
                        gender={this.state.gender}
                        language={this.state.language}
                        onLoginRequired={this.props.onLoginRequired}
                        isLoggedIn={this.props.isLoggedIn}
                        onForbiddenLetterChange={this.onForbiddenLetterChange}
                        onForbiddenStartLetterChange={this.onForbiddenStartLetterChange}
                        onGenderChanger={this.onGenderChanger}
                        onGenderEnable={this.onGenderEnable}
                        onLanguageChange={this.onLanguageChange}
                        onResetClick={this.onResetClick}
                        onRequiredLetterChange={this.onRequiredLetterChange}
                        keepAccentOnFilters={this.state.keepAccentOnFilters}
                        keepAccentOnFiltersChange={this.keepAccentOnFiltersChange}
                        />

                    <Layout.Content style={{ minWidth: "350px" }}>

                        <Row style={{ width: '100%', background: '#FC5638', color: 'white', maxHeight: "64px" }}>

                            <Col span={24} style={{ display: 'flex', alignItems: 'strech' }}>

                                <MenuOutlined onClick={this.toggleSider}
                                              className="siderButton"/>

                                <div className="loader" style={{ opacity: this.state.isSaving ? 1: 0}}>
                                    <Spin />
                                </div>
                            </Col>

                        </Row>

                        <div>
                            <NameList
                                userId={this.props.userId}
                                onSave={this.onNamesSave}
                                names={this.updateFilteredName()}/>
                        </div>

                    </Layout.Content>

                </Layout>

                <Layout.Footer>
                    Name Picker - <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://github.com/HugoGresse/name-picker">Open Source project on GitHub, by Hugo Gresse</a>
                </Layout.Footer>

            </Layout>
        )
    }
}

export default NamePicker
