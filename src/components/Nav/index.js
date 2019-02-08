import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Button } from 'antd';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Nav = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavAuth /> : <NavNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavAuth = () => (
    <Row type="flex" justify="center" align="middle" className='main_nav'>
  
      <Col span={3}>
        <Link to={ROUTES.ABOUT} className='nav_item'>About Parsuit</Link>
      </Col>
      
       <Col span={3}>
        <Link to={ROUTES.ACCOUNT} className='nav_item'>Account</Link>
       </Col>
  
      <Col span={3}>
         <SignOutButton />
       </Col>
  
  </Row>
  
);

const NavNonAuth = () => (
  <Row type="flex" justify="center" align="middle" className='main_nav'>
  
      <Col span={3}>
        <Link to={ROUTES.ABOUT} className='nav_item'>About Parsuit</Link>
      </Col>

       <Col span={3}>
         <Button>
           <Link to={ROUTES.SIGN_IN} className='nav_item'>Sign In / Sign Up</Link>
         </Button>
       </Col>
  
  </Row>

);

export default Nav;