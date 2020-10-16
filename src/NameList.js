import React, { useEffect, useState } from "react"
import { listenForRealtimeFavoritesNames, saveFavoritesNames } from './firebase/favoritesNamesStore'
import { Table,  message } from 'antd'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'ascend',
    width: 130,
    sorter: (a, b) => a.name.localeCompare(b.name)
}, {
    title: 'Frequency',
    dataIndex: 'frequency',
    sorter: (a, b) => {
        if (a.frequency > b.frequency) return 1
        else if (a.frequency < b.frequency) return -1
        return 0
    },
}, {
    title: 'Language',
    dataIndex: 'language',
    sorter: (a, b) => a.language.localeCompare(b.language),
}]

const NameList = ({ userId, names, onSave }) => {
    const [favoritesNames, setFavoritesNames] = useState([])

    useEffect(() => {
        if(userId) {
            onSave(true)
            return listenForRealtimeFavoritesNames(userId, (names) => {
                onSave(false)
                setFavoritesNames(names)
            })
        }
    }, [userId])

    const onRowSelectionChange = selectedRowKeys => {
        if(userId) {
            onSave(true)
            saveFavoritesNames(userId, selectedRowKeys)
                .then((success) => {
                    onSave(false)
                    if(!success) {
                        message.error('Failed to save names to your account', 4);
                    }
                })

        } else {
            message.error('Login to save the names to your account', 4);
        }
    }

    const items = names
        .map((item) => {
            item.key = item.name
            return item
        })

    const rowSelection = {
        selectedRowKeys: favoritesNames,
        onChange: (selectedRowKeys) => {
            onRowSelectionChange(selectedRowKeys)
        }
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={items}
                rowSelection={rowSelection}
                pagination={{ position: 'both', pageSize: 100 }}
                size="middle"/>

        </div>
    )
}

export default NameList
