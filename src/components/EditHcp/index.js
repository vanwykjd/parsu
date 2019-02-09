import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import { InputNumber, Button } from 'antd';

const HandicapChangePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className='account_form'>
        <h1>Edit Handicap</h1>
        <HandicapChangeForm user={authUser}/>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const INITIAL_STATE = {
  handicap: '',
  error: null
};

class HandicapChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(e) {
    const { handicap } = this.state;
    const user = this.props.user;
    this.props.firebase.user(user.uid)
      .update({handicap: handicap})
      .then(() => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.ACCOUNT);
      })
    .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  }

  onChange(value) {
    this.setState({ handicap: value });
  }

  render() {
    const { handicap, error } = this.state;
    const currentHandicap = this.props.user.handicap;
    
    const isInvalid =
      handicap === '' ||
      handicap === currentHandicap;

    return (
      <form onSubmit={this.onSubmit}>
        <InputNumber
          name="handicap"
          value={handicap}
          onChange={this.onChange}
          min={-5}
          placeholder={currentHandicap}
        />
        <Button disabled={isInvalid} htmlType="submit">
          Update
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const HandicapChangeLink = () => (
  <div className='form_link'>
    <Link to={ROUTES.HCP_EDIT}>Edit</Link>
  </div>
);

const HandicapChangeForm = compose(
  withRouter,
  withFirebase,
)(HandicapChangeFormBase);

export { HandicapChangeForm, HandicapChangeLink };

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HandicapChangePage);