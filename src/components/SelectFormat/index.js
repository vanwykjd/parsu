import React, { Component } from 'react';

import { Form, Select } from 'antd';
import { getFormats } from '../../formats';

const Option = Select.Option;

class SelectFormat extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      format: null,
    };
    
    this.selectFormat = this.selectFormat.bind(this);
  }
  
  
  selectFormat(format) {
    this.props.selectFormat(format);
    this.setState({ format: format });
  }
  
  
 render() {  
    const formatList = getFormats();
    const format = (this.state.format) ? this.state.format : undefined;
    return (
          <Form.Item
            label={'Select a Format'}
            key={format}>
              <Select
                showSearch
                value={format}
                style={{ width: "100%" }}
                placeholder="Select Format"
                optionFilterProp="children"
                onChange={this.selectFormat}
              >
              {formatList.map((format) =>
                <Option key={format.id} value={format.id}>{format.name}</Option>
              )}
              </Select>
          </Form.Item>
    );
  }
}

export default (SelectFormat);