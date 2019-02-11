import React, { Component } from 'react';


import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase';

import { AuthUserContext, withAuthorization } from '../Session';


const UserMatchPage = () => (
    <AuthUserContext.Consumer>
      {authUser => 
       <UserMatch user={authUser.uid} />
      }
    </AuthUserContext.Consumer>
  
);

class MatchBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      course: null,
      match: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.db.ref(`matches/${this.props.match.params.id}`).on('value', snapshot => {
      const matchObject = snapshot.val();
      this.setState({
        match: matchObject,
        loading: false,
      });
    });
  }
  
  componentWillUnmount() {
    this.props.firebase.db.ref(`matches/${this.props.match.params.id}`).off();
  }
  
  render() {
    const { match } = this.state;
    return (
      <div>
        <h1>Match ({this.props.match.params.id})</h1>
      </div>
    );
  }
}

const UserMatch = compose(
  withRouter,
  withFirebase,
)(MatchBase);

export { UserMatch };

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserMatchPage);