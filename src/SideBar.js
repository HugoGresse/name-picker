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


const SideBar = ({siderCollapsed, onGenderEnable, onGenderChanger, onLanguageChange, gender, language, forbiddenLetter, onForbiddenLetterChange, onForbiddenStartLetterChange, forbiddenStartLetter, onResetClick}) => {


    return  <Layout.Sider
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

            <Checkbox
                checked={gender.length > 0}
                onChange={onGenderEnable}/>
            <span>C'est un(e) </span>
            <Switch
                checked={gender === 'm'}
                onChange={onGenderChanger}
                checkedChildren="garçon"
                unCheckedChildren="fille"/>

            <br/>

            <h5 style={{ marginTop: '16px' }}>Languages</h5>
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

            <h5 style={{ marginTop: '16px' }}>Does not contain</h5>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=""
                value={forbiddenLetter}
                onChange={onForbiddenLetterChange}
            >
                {getAlphabetOptions()}
            </Select>

            <h5 style={{ marginTop: '16px' }}>Ne commence pas par</h5>

            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=""
                value={forbiddenStartLetter}
                onChange={onForbiddenStartLetterChange}
            >
                {getAlphabetOptions()}
            </Select>

            <br/>
            <br/>

            <Button onClick={onResetClick}>Reset filters</Button>


        </Row>
    </Layout.Sider>

}

export default SideBar
