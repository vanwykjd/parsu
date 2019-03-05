import React, { Component } from 'react';
import { Radio, Form, Button, Row } from 'antd';
import { withFirebase } from '../Firebase';

const RadioGroup = Radio.Group;

class SelectTeesForm extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      tees: null,
      loading: false,
    };

    this.selectTees = this.selectTees.bind(this);
    this.setTees = this.setTees.bind(this);
  }
  
  // *** Enables user to select tee options for current round ***
  selectTees(e) {
    this.setState({
      tees: e.target.value,
    });
  }
  
  // *** Submits selected tees to be set for current round ***
  setTees() {
    const { tees } = this.state;
    this.props.selectTees(tees);
  }
                                     
  render() {
    const { tees } = this.state;
    const isInvalid  = tees === null;
    const tee_options = this.props.course.tee_options[this.props.user.gender]
    
    return (
      <div>
      <h1>Select Tees</h1>
      <Form className="registration-form">
        <Form.Item>
            <RadioGroup onChange={this.selectTees} value={tees}>
                {tee_options.map((option) =>
                    <Radio key={option.tee_name} value={option}>{option.tee_name}</Radio>
                )}  
            </RadioGroup>
        </Form.Item>

        
        <Row type="flex" justify="center" align="middle">
          <Button type="primary" disabled={isInvalid} onClick={this.setTees} className="login-form-button">
              Start Round
          </Button>
        </Row>
      </Form>
      </div>
    );
  }
}

export default withFirebase(SelectTeesForm);