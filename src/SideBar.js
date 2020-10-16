import React from 'react'
import { Button, Checkbox, Col, Row, Select, Switch } from 'antd'
import logo from './logo.svg'
import Layout from 'antd/lib/layout'
import { getLanguagesOptions } from './data/getLanguagesOptions'

const getAlphabetOptions = () => {
    const options = []
    const alphabet = ['a', 'æ', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    alphabet.forEach((e) => {
        options.push(<Select.Option key={e}>{e}</Select.Option>)
    })

    return options
}


const SideBar = ({
                     siderCollapsed,
                     onLoginRequired,
                     isLoggedIn,
                     onGenderEnable,
                     onGenderChanger,
                     onLanguageChange,
                     gender,
                     language,
                     forbiddenLetter,
                     onForbiddenLetterChange,
                     onForbiddenStartLetterChange,
                     forbiddenStartLetter,
                     onResetClick,
                    requiredLetters,
    onRequiredLetterChange
                 }) => {


    return <Layout.Sider
        trigger={null}
        collapsible
        breakpoint="lg"
        collapsedWidth="0"
        width="300"
        collapsed={siderCollapsed}
        style={{ backgroundColor: '#dddddd' }}>

        <Row className="siderRow">

            <Col span={24} style={{ textAlign: 'center' }}>
                <img src={logo} style={{ maxWidth: "200px" }} alt="Logo"/>
            </Col>
        </Row>

        <Row className="siderRow">


            <Col span={24}>
                <Checkbox
                    checked={gender.length > 0}
                    onChange={onGenderEnable}/>
                <span>C'est un(e) </span>
                <Switch
                    checked={gender === 'm'}
                    onChange={onGenderChanger}
                    checkedChildren="garçon"
                    unCheckedChildren="fille"/>
            </Col>


            <Col span={24}>
                <h5 style={{ marginTop: '16px' }}>Languages</h5>
            </Col>
            <Col span={24}>
                <Select
                    showSearch
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Languages"
                    optionFilterProp="children"
                    value={language}
                    onChange={onLanguageChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {getLanguagesOptions()}
                </Select>
            </Col>

            <Col span={24}>
                <h5 style={{ marginTop: '16px' }}>Does contain</h5>
            </Col>
            <Col span={24}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder=""
                    value={requiredLetters}
                    onChange={onRequiredLetterChange}
                >
                    {getAlphabetOptions()}
                </Select>
            </Col>

            <Col span={24}>
                <h5 style={{ marginTop: '16px' }}>Does NOT contain</h5>
            </Col>
            <Col span={24}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder=""
                    value={forbiddenLetter}
                    onChange={onForbiddenLetterChange}
                >
                    {getAlphabetOptions()}
                </Select>
            </Col>

            <Col span={24}>
                <h5 style={{ marginTop: '16px' }}>Doest NOT begin with</h5>
            </Col>
            <Col span={24}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder=""
                    value={forbiddenStartLetter}
                    onChange={onForbiddenStartLetterChange}
                >
                    {getAlphabetOptions()}
                </Select>
            </Col>

            <Col span={24}>
                <Button onClick={onResetClick} style={{ marginTop: 16 }}>Reset filters</Button>
            </Col>
            <Col span={24}>
                <Button type="primary" style={{ marginTop: 16 }}
                        onClick={() => {
                            if (isLoggedIn) {
                                onLoginRequired(false)
                            } else {
                                onLoginRequired(true)
                            }
                        }}>{isLoggedIn ? "Logout" : "Login to save selected names"}</Button>
            </Col>

        </Row>
    </Layout.Sider>

}

export default SideBar
