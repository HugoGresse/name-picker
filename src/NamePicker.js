import React, { Component } from "react"
import Prenoms from "./Prenoms.json"
import Layout from "antd/lib/layout"

import NameList from './NameList'
import { Row, Col, Spin } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import SideBar from './SideBar'

class NamePicker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            forbiddenStartLetter: [],
            forbiddenLetter: [],
            forbiddenName: '',
            language: [],
            gender: '',
            sortFrequency: '',
            siderCollapsed: false
        }
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
                if (this.state.forbiddenLetter.length === 0) {
                    return true
                }
                // Remove accent and remove the first char
                let chars = item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").slice(1)
                let keep = true
                this.state.forbiddenLetter.forEach(letter => {
                    if (chars.includes(letter)) {
                        keep = false
                    }
                })
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

    onForbiddenStartLetterChange = (value) => {
        this.setState({ forbiddenStartLetter: value })
    }

    onLanguageChange = (languages) => {
        this.setState({ language: languages })
    }

    onResetClick = () => {
        this.setState({
            forbiddenStartLetter: [],
            forbiddenLetter: [],
            forbiddenName: '',
            language: [],
            gender: ''
        })
    }

    onFrequencyFilterDown = () => {
        this.setState({ sortFrequency: 'desc' })
    }

    onFrequencyFilterUp = () => {
        this.setState({ sortFrequency: 'asc' })
    }


    render() {
        return (
            <Layout>
                <Layout>
                    <SideBar
                        siderCollapsed={this.state.siderCollapsed}
                        forbiddenLetter={this.state.forbiddenLetter}
                        forbiddenStartLetter={this.state.forbiddenStartLetter}
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
                                onSave={isSaving => {
                                    this.setState({
                                        isSaving: isSaving
                                    })
                                }}
                                names={this.updateFilteredName()}/>
                        </div>

                    </Layout.Content>

                </Layout>

                <Layout.Footer>
                    Name Picker - <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://hugo.gresse.io">Hugo Gresse</a>
                </Layout.Footer>

            </Layout>
        )
    }
}

export default NamePicker
