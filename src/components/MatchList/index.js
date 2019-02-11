import React, { Component } from 'react';


import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom'


import { List } from 'antd';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext, withAuthorization } from '../Session';

const MatchListPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Your Current Matches</h1>
        <MatchList user={authUser.uid} />
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
    this.props.firebase.db.ref(`users/${this.props.user}/matches`).on('value', snapshot => {
     
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
    this.props.firebase.db.ref(`users/${this.props.user}/matches`).off();
  }
  

  render() {
    const { matchList, loading, isEmpty } = this.state;
  
    return (
      <div>
        { loading && <div>Loading matches...</div> }
        
        { isEmpty && <div>Looks like you need to create some matches...</div> }
         
        { matchList && 
           <List size="large" bordered>
             { matchList.map( (match) =>
               <List.Item key={match.uid}>
                 <List.Item.Meta title={match.uid} description={match.uid}  />
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