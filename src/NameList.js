import React, { Component } from "react";
import { Pagination, Table } from "antd/lib/";


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  defaultSortOrder: 'ascend',
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: 'Frequency',
  dataIndex: 'frequency',
  sorter: (a, b) => a.frequency - b.frequency,
}, {
  title: 'Language',
  dataIndex: 'language',
  sorter: (a, b) => a.language.length - b.language.length,
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
      .slice(
        this.state.startItem,
        this.state.startItem + this.state.itemPerPage
      ).map( (item) => {
        item.key = item.name
        return item
      })

    console.log(items)
    const totalNames = this.props.names ? this.props.names.length : 1;

    return (
      <div>
        <Pagination
          style={{padding: '16px'}}
          current={this.state.page}
          showTotal={total => `${total} prénoms`}
          pageSize={this.state.itemPerPage}
          onChange={this.onPaginationChange}
          total={totalNames}
        />
        <Table columns={columns} dataSource={items} size="middle" pagination={false} onChange={this.onTableChange} />
        <Pagination
          style={{padding: '16px'}}
          current={this.state.page}
          showTotal={total => `${total} prénoms`}
          pageSize={this.state.itemPerPage}
          onChange={this.onPaginationChange}
          total={totalNames}
        />
      </div>
    );
  }
}

export default NameList;
