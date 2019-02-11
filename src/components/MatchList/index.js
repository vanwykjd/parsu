import React, { Component } from 'react';

import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom'

import { List } from 'antd';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext, withAuthorization } from '../Session';

import { CreateMatchLink } from '../CreateMatch';

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

class MatchListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isEmpty: false,
      matchList: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.db.ref(`users/${this.props.user.uid}/matches`).on('value', snapshot => {
     
      if ( snapshot.val() ) {
        const matchObject = snapshot.val();
        const matchList = Object.keys(matchObject).map(key => ({
        ...matchObject[key],
        uid: key,
        }));
        
        this.setState({
          matchList: matchList,
          isEmpty: false,
          loading: false,
        });
      } else {
        this.setState({
          isEmpty: true,
          loading: false,
        });
      }
      
    });
  }
  
  componentWillUnmount() {
    this.props.firebase.db.ref(`users/${this.props.user.uid}/matches`).off();
  }
  

  render() {
    const { matchList, loading, isEmpty } = this.state;
  
    return (
      <div>
        
        { !loading && isEmpty && <div>Looks like you need to create some matches...</div> }
         
        { !loading && matchList && 
           <List size="large" bordered>
             { matchList.map( (match) =>
               <List.Item key={match.uid}>
                 <List.Item.Meta title={match.course} description={match.date}  />
                   <Link to={`${ROUTES.MATCHES}/${match.uid}`}>
                      Go To Match
                   </Link>
                 </List.Item>
             )}
           </List>
        }
      </div>
    );
  }
}


const MatchList = compose(
  withRouter,
  withFirebase,
)(MatchListBase);

export { MatchList };

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MatchListPage);