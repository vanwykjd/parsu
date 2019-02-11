import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';

import { Form, Icon, Input, Button, Row } from 'antd';

import { PasswordForgetLink } from '../PwForget';
import { RegisterLink } from '../Register'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className='account_form'>
  <Row type="flex" justify="center" align="middle">
    <h1>Sign In</h1>
  </Row>
    <SignInForm />
    <PasswordForgetLink />
    <RegisterLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.MATCHES);
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
    const { email, password, error } = this.state;
    const isInvalid = email === '' || password === '';
    
    return (
      <Form onSubmit={this.onSubmit} className="signin-form">
    
        <Form.Item>
          <Input name="email"
                 value={email}
                 prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="text"
                 autoComplete="new-email"
                 placeholder="Email" />
        </Form.Item>
      
        <Form.Item>
          <Input name="password"
                 value={password}
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="password"
                 autoComplete="new-password"
                 placeholder="Password" />
        </Form.Item>
        <Row type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
              Sign In
          </Button>
        </Row>
        
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };