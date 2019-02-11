import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Button} from 'antd';

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
  <div className='main_nav_wrapper'>
    <div className='main_nav'>
        
        <div className='nav_item_wrapper'>
          <Link className='nav_item' to={ROUTES.MATCHES} >Matches</Link>
        </div>

      
        <div className='nav_item_wrapper'>
          <Link className='nav_item' to={ROUTES.ACCOUNT} >Account</Link>
        </div>

  
        <div className='nav_item_btn'>
          <SignOutButton />
        </div>

    </div>
  </div>
  
);

const NavNonAuth = () => (
  <div className='main_nav_wrapper'>
    <div className='main_nav'>
  
      <div className='nav_item_wrapper'>
        <Link to={ROUTES.REGISTER} className='nav_item'>Sign Up</Link>
      </div>
  
      <div className='nav_item_wrapper'>
        <Link to={ROUTES.ABOUT} className='nav_item'>Parsuit</Link>
      </div>
  
      <div className='nav_item_btn'>
        <Button>
          <Link className='nav_item' to={ROUTES.SIGN_IN}>Sign In</Link>
        </Button>
      </div>

    </div>
  </div>

);

export default Nav;