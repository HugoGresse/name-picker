import React, { Component } from "react";
import { Table } from "antd/lib/";

const { Column, ColumnGroup } = Table;

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

    this.state = {
      page: 1,
      startItem: 0,
      itemPerPage: 200
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
    const totalNames = this.props.names ? this.props.names.length : 1;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={items}
          pagination={{ position: 'both' , pageSize: 100 }}
          size="middle"
          onChange={this.onTableChange} />
      </div>
    );
  }
}

export default NameList;
