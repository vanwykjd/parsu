import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row } from 'antd';


const INITIAL_STATE = {
  password: '',
  pwConfirm: '',
  error: null,
};

const PasswordChangePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className='account_form'>
        <h1>Change Your Password</h1>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);


class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { password } = this.state;

    this.props.firebase
      .doPasswordUpdate(password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ACCOUNT);
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
    const { password, pwConfirm, error } = this.state;

    const isInvalid =
      password !== pwConfirm || pwConfirm === '';

    return (
      <Form onSubmit={this.onSubmit} className="signin-form">
    
        <Form.Item>
          <Input name="password"
                 value={password}
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="password"
                 placeholder="New Password" />
        </Form.Item>
        <Form.Item>
          <Input name="pwConfirm"
                 value={pwConfirm}
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 onChange={this.onChange}
                 type="password"
                 placeholder="Confirm Password" />
        </Form.Item>
      
        <Row type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
              Reset My Password
          </Button>
        </Row>
        
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordChangeLink = () => (
  <div className='form_link'>
    <Link to={ROUTES.PW_RESET}>Change My Password</Link>
  </div>
);

const PasswordChangeForm = compose(
  withRouter,
  withFirebase,
)(PasswordChangeFormBase);

export { PasswordChangeForm, PasswordChangeLink};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PasswordChangePage);


