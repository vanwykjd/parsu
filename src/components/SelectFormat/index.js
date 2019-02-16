import React, { Component } from 'react';

import { Form, Select, Tooltip } from 'antd';
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
                <Option key={format.format_id} value={format.format_id}>
                  <Tooltip title={format.description}>
                    {format.format_name}
                  </Tooltip>
                </Option>
    
              )}
              </Select>
          </Form.Item>
    );
  }
}

export default (SelectFormat);