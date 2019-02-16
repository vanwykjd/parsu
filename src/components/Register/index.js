import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Form, Icon, Input, InputNumber, Button, Row, Radio } from 'antd';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const RegisterPage = () => (
  <div className='account_form'>
  <Row type="flex" justify="center" align="middle">
    <h1>Create Account</h1>
  </Row>
    <RegisterForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  handicap: '',
  gender: '',
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
    const { username, email, password, handicap, gender } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
          return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
              handicap,
              gender,
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
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  changeHandicap = value => {
    this.setState({ handicap: value })
  };

  render() {
    const { username, email, password, handicap, gender, error } = this.state;
    const isInvalid = username === '' || email === '' || password === '' || handicap === '' || gender === '';
    
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
      
        <Form.Item>
          <Radio.Group name="gender" onChange={this.onChange} value={gender}>
            <Radio value={'M'}>Male</Radio>
            <Radio value={'F'}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <InputNumber
            className='form_input_number'
            name="handicap"
            value={handicap}
            onChange={this.changeHandicap}
            min={-5}
            placeholder='Handicap'
          />
        </Form.Item>
      
        <Row type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
              Create Account
          </Button>
        </Row>
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