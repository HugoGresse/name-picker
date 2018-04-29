import React, { Component } from "react";
import { Table } from "antd/lib/";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  defaultSortOrder: 'ascend',
  width:130,
  sorter: (a, b) => a.name.localeCompare(b.name)
}, {
  title: 'Frequency',
  dataIndex: 'frequency',
  sorter: (a, b) => {
    if(a.frequency > b.frequency) return 1
    else if(a.frequency < b.frequency) return -1
    return 0
  } ,
}, {
  title: 'Language',
  dataIndex: 'language',
  sorter: (a, b) => a.language.localeCompare(b.language),
}];

class NameList extends Component {
  constructor(props) {
    super(props);

    let selected = JSON.parse(localStorage.selectedName)
    if(!selected){
      selected = []
    }

    this.state = {
      page: 1,
      startItem: 0,
      itemPerPage: 200,
      selected: selected
    };
  }

  onPaginationChange = page => {
    this.setState({
      page: page,
      startItem: (page -1) * this.state.itemPerPage
    });
  };

  onTableChange = () => {

  }

  render() {
    const items = this.props.names
    .map( (item) => {
      item.key = item.name
      return item
    })

    const rowSelection = {
      selectedRowKeys: this.state.selected,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selected: selectedRowKeys
        })
        localStorage.setItem('selectedName', JSON.stringify(selectedRowKeys))
      }
    };

    return (
      <div>
        <Table
          columns={columns}
          dataSource={items}
          rowSelection={rowSelection}
          pagination={{ position: 'both' , pageSize: 100 }}
          size="middle"
          onChange={this.onTableChange} />
      </div>
    );
  }
}

export default NameList;
