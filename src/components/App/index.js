import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from '../Nav';
import AboutPage from '../About';
import AccountPage from '../Account';
import RegisterPage from '../Register';
import SignInPage from '../SignIn';
import HandicapChangePage from '../EditHcp';
import PwForgetPage from '../PwForget';
import PwChangePage from '../PwReset';
import MatchListPage from '../MatchList';
import MatchPage from '../Match';
import CreateMatchPage from '../CreateMatch';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
      <div className='content_container'>
        <Nav />
        <div className='content'>
        <Route path={ROUTES.ABOUT} component={AboutPage} />  
        <Route path={ROUTES.REGISTER} component={RegisterPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
  
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.HCP_EDIT} component={HandicapChangePage} />
        
        
        <Route path={ROUTES.PW_FORGET} component={PwForgetPage} />
        <Route path={ROUTES.PW_RESET} component={PwChangePage} />
        
        <Route exact path={ROUTES.MATCHES} component={MatchListPage} />
        <Route exact path={ROUTES.MATCH} component={MatchPage} />
        <Route exact path={ROUTES.CREATE_MATCH} component={CreateMatchPage} />
        </div>
      </div>
    </Router>
);

export default withAuthentication(App);
