import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Form, Icon, Input, Button, Row } from 'antd';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const RegisterPage = () => (
  <div className='form'>
    <h1>Create Account</h1>
    <RegisterForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
};

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);
    
    this.state = {...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(username, email, password)
      .then(authUser => {
          return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ABOUT);
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
    const { username, email, password, error } = this.state;
    const isInvalid = username === '' || email === '' || password === '';
    
    return (
      <Form onSubmit={this.onSubmit} className="registration-form">
        <Form.Item>
            <Input name='username'
                   value={username}
                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   onChange={this.onChange}
                   type="text"
                   placeholder="Username" />
        </Form.Item>
      
        <Form.Item>
          <Input name="email"
                 value={email}
                 prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="text"
                 placeholder="Email" />
        </Form.Item>
      
        <Form.Item>
          <Input name="password"
                 value={password}
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="password"
                 placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
            Create Account
        </Button>
        
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const RegisterLink = () => (
  <div className='form_link'>
    <Row type="flex" justify="center" align="middle">
      Don't' have an account? 
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Link to={ROUTES.REGISTER}>Create Account</Link>
    </Row>
  </div>
);



const RegisterForm = compose(
  withRouter,
  withFirebase,
)(RegisterFormBase);

export default RegisterPage;

export { RegisterForm, RegisterLink };