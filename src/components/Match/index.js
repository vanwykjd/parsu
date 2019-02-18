import React from 'react';

import Round from '../Round';
import ScoreCard from '../ScoreCard';

import { AuthUserContext, withAuthorization } from '../Session';

const UserMatchPage = (props) => (
    <AuthUserContext.Consumer>
      {authUser =>
       <div className='match_content'>
         <ScoreCard match_id={props.match.params.id}/>
      
         <Round round_id={props.location.state.round_id} user={authUser}/> 
       </div>
      }
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserMatchPage);