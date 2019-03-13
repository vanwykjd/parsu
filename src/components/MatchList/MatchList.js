import React, { Component } from 'react';
import { List } from 'antd';
import { withFirebase } from '../Firebase';

import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';


class MatchList extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      matchList: null,
      loading: false,
    };
    
    this.getUserMatches = this.getUserMatches.bind(this);
  }
  
  getUserMatches() {
    this.setState({ loading: true });
    
    this.props.firebase.db.ref(`users/${this.props.user.uid}/matches`).on('value', snapshot => {
      const matchesObject = snapshot.val();
      let matchList = this.state.matchList;
      if (matchesObject) {
        matchList = Object.keys(matchesObject).map(key => ({
          ...matchesObject[key],
          uid: key,
        }))
      }
      
      this.setState({ matchList: matchList, loading: false });
      });
  }
  
  componentDidMount() {
    if (this.state.matchList) {
      return;
    }
    console.log('Getting User Matches');
    this.getUserMatches();
  }
  
  componentWillUnmount() {
    console.log('Off User Matches');
    this.props.firebase.db.ref(`users/${this.props.user.uid}/matches`).off();
  }

                                     
  render() {
    const { matchList } = this.state;

    return (
     <section>
        { matchList ? (
           <List size="large" bordered>
            { matchList.map( (match) =>
              <List.Item key={match.uid}>
                <List.Item.Meta title={match.course_name} description={match.date_created}  />
                <Link
                  to={{ 
                    pathname: `${ROUTES.MATCHES}/${match.uid}`,
                    state: { round_id: match.round_id },
                  }}>
                    Go To Match
                </Link>
              </List.Item>
            )}
           </List>
         ) : (
          <div style={{ textAlign: 'center'}}>
            No matches have been set up. Create a new match to get started.
          </div>
         )
        }
     </section>
    );
  }
}

export default withFirebase(MatchList);