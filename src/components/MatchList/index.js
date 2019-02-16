import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';

import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { CreateMatchLink } from '../CreateMatch';
import MatchList from './MatchList';

const MatchListPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
       <CreateMatchLink />
       <h1>Your Matches</h1>
       <MatchList user={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(MatchListPage);