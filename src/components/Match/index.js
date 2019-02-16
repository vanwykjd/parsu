import React, { Component } from 'react';


import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase';
import Round from '../Round';
import ScoreCard from '../ScoreCard';


import { AuthUserContext, withAuthorization } from '../Session';


const UserMatchPage = (props) => (
    <AuthUserContext.Consumer>
      {authUser =>
       <div>
         <ScoreCard match_id={props.match.params.id}/>
         <br/>
         <Round round_id={props.location.state.round_id} user={authUser}/> 
       </div>
      }
    </AuthUserContext.Consumer>
);

/*
class MatchBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      match: null,
      ...props.location.state,
    };
    this.getMatch = this.getMatch.bind(this);
  }
    
  getMatch() {
    this.setState({ loading: true });
    this.props.firebase.db.ref(`matches/${this.props.match.params.id}`).on('value', snapshot => {
      const matchObject = snapshot.val();
      this.setState({
        match: matchObject,
        loading: false,
      });
    });
  }
    

  componentDidMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      console.log(this.props.match.params.id);
      
    }
    
    this.getMatch();
  }
  
  componentWillUnmount() {
    this.props.firebase.db.ref(`matches/${this.props.match.params.id}`).off();
  }
  
  render() {
    const { match } = this.state;

    return (
      <div>
        {match && 
          <div>
           
            
          </div>
        }

      </div>
    );
  }
}

const UserMatch = compose(
  withRouter,
  withFirebase,
)(MatchBase);

export { UserMatch };
*/
const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserMatchPage);