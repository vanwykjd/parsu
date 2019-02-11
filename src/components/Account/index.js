import React from 'react';
import UserInfo from '../UserInfo';

import { AuthUserContext, withAuthorization } from '../Session';

import { PasswordChangeLink } from '../PwReset';

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account Info</h1>
        <UserInfo user={authUser.uid} />
        <PasswordChangeLink />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);