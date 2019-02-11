import React from 'react';
import { List } from 'antd'

import { AuthUserContext, withAuthorization } from '../Session';

import { PasswordChangeLink } from '../PwReset';
import HandicapChangeForm  from '../EditHcp';

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account Info</h1>
        <List size="large" bordered>
          <List.Item>
            <List.Item.Meta title="Email" description={authUser.email} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title="Username" description={authUser.username} />
          </List.Item>

          <HandicapChangeForm user={authUser} />
     
        </List>
        <PasswordChangeLink />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);