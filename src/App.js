import React, { Component } from "react"
import Prenoms from "./Prenoms.json"
import Layout from "antd/lib/layout"

import "./App.css"
import logo from "./logo.svg"
import NameList from './NameList'
import { Row, Select, Switch, Button, Checkbox, Col } from 'antd'
import Icon from '@ant-design/icons'

class App extends Component {

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

    getLanguageOptions = () => {
        const languages = []
        const options = []
        let innerLanguage = []

        for (var i = 0, len = Prenoms.length; i < len; i++) {

            innerLanguage = Prenoms[i].language.split(', ')

            for (var j = 0, length = innerLanguage.length; j < length; j++) {
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

    getAlphabetOptions = () => {
        const options = []
        const alphabet = ['a', 'æ', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

        alphabet.forEach((e) => {
            options.push(<Select.Option key={e}>{e}</Select.Option>)
        })

        return options
    }

    render() {
        return (
            <Layout>
                <Layout>
                    <Layout.Sider
                        trigger={null}
                        collapsible
                        breakpoint="lg"
                        collapsedWidth="0"
                        width="300"
                        collapsed={this.state.siderCollapsed}
                        style={{ backgroundColor: '#dddddd' }}>

                        <Row className="siderRow">

                            <Col span={24} style={{ textAlign: 'center' }}>
                                <img src={logo} style={{ maxWidth: "200px" }} alt="Logo"/>
                            </Col>
                        </Row>

                        <Row className="siderRow">

                            <Checkbox
                                checked={this.state.gender.length > 0}
                                onChange={this.onGenderEnable}/>
                            <span>C'est un(e) </span>
                            <Switch
                                checked={this.state.gender === 'm'}
                                onChange={this.onGenderChanger}
                                checkedChildren="garçon"
                                unCheckedChildren="fille"/>

                            <br/>

                            <h5 style={{ marginTop: '16px' }}>Langues</h5>
                            <Select
                                showSearch
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Langue"
                                optionFilterProp="children"
                                value={this.state.language}
                                onChange={this.onLanguageChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.getLanguageOptions()}
                            </Select>

                            <h5 style={{ marginTop: '16px' }}>Ne contient pas</h5>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder=""
                                value={this.state.forbiddenLetter}
                                onChange={this.onForbiddenLetterChange}
                            >
                                {this.getAlphabetOptions()}
                            </Select>

                            <h5 style={{ marginTop: '16px' }}>Ne commence pas par</h5>

                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder=""
                                value={this.state.forbiddenStartLetter}
                                onChange={this.onForbiddenStartLetterChange}
                            >
                                {this.getAlphabetOptions()}
                            </Select>

                            <br/>
                            <br/>

                            <Button onClick={this.onResetClick}>Reset filters</Button>


                        </Row>
                    </Layout.Sider>

                    <Layout.Content style={{ minWidth: "350px" }}>

                        <Row style={{ width: '100%', background: '#FC5638', color: 'white', maxHeight: "64px" }}>

                            <Col span={24} style={{ display: 'flex', alignItems: 'strech' }}>

                                <Icon
                                    style={{
                                        width: '50px',
                                        minWidth: "50px",
                                        cursor: 'pointer',
                                        background: '#f33434',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    className="siderButton"
                                    type={this.state.siderCollapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggleSider}
                                />
                                <div
                                    style={{ padding: '16px', width: '100%' }}>
                                    Trier par
                                    <Button.Group style={{ marginLeft: '16px' }}>
                                        <Button disabled ghost style={{ color: 'white' }}>Fréquence</Button>
                                        <Button onClick={this.onFrequencyFilterDown}><Icon type="down"/></Button>
                                        <Button onClick={this.onFrequencyFilterUp}><Icon type="up"/></Button>
                                    </Button.Group>
                                </div>
                            </Col>

                        </Row>

                        <div>
                            <NameList
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

export default App
