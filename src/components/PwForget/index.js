import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row } from 'antd';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div className='account_form'>
    <h1>To Reset Your Password...</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit} className="signin-form">
    
        <Form.Item
          label='Enter the email used to access your account'
        >
          <Input name="email"
                 value={email}
                 prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="text"
                 placeholder="Email" />
        </Form.Item>
      
        <Row type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
              Send Password Reset Form
          </Button>
        </Row>
        
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <div className='form_link'>
    <Row type="flex" justify="center" align="middle">
      <Link to={ROUTES.PW_FORGET}>Forgot Password?</Link>
    </Row>
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
