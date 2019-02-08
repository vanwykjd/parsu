import React, { Component } from 'react';
import { List } from 'antd'

import { withFirebase } from '../Firebase';
import { HandicapChangeLink } from '../EditHcp';

class PlayerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
    };
  }

  componentDidMount() {

    this.setState({ loading: true });

    this.props.firebase.user(`${this.props.user}`).on('value', snapshot => {
      this.setState({
        user: snapshot.val(),
        loading: false,
      });
    });
  }
  
  componentWillUnmount() {
    this.props.firebase.users(`${this.props.user}`).off();
  }
  
  render() {
    const { user } = this.state;
    return (
        <div>
          { user && 
           <List size="large" bordered>
            <List.Item>
              <List.Item.Meta title="Email" description={user.email} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Username" description={user.username} />
            </List.Item>

            <List.Item>
              <List.Item.Meta title="Handicap" description={user.handicap} />
              <HandicapChangeLink />
            </List.Item>
           </List>
          }
        </div>
    );
  }
}

export default withFirebase(PlayerInfo);