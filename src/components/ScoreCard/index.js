import React, { Component } from 'react';

import { getCourse } from '../../courses';
import { Row, Col } from 'antd';
import { withFirebase } from '../Firebase';

import PlayerPoints from '../PlayerPoints';
import PlayerScores from '../PlayerScores';


const Points = (props) => (
  <section>
  <h1>Points</h1>
  { Object.keys(props.players).map( (player) =>
     <Row>
        <PlayerPoints key={player} points={props.points[player]} player={props.players[player]} />
     </Row>
   )}
   </section>
) 

const Scores = (props) => (
  <section>
    <h1>Scores</h1>
    { Object.keys(props.players).map( (player) =>
       <Row>
         <Col span={4}>{props.players[player]}</Col>
          <PlayerScores key={player} scores={props.scores} player={player} match_id={props.match_id} format={props.format} />
       </Row>
     )}
   </section>
);


class ScoreCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      course: null,
      match: null,
    };
   
    this.getMatchData = this.getMatchData.bind(this);
  }
  
  getMatchData() {
   this.setState({ loading: true });
      this.props.firebase.db.ref(`matches/${this.props.match_id}`).on('value', snapshot => {
        const match = snapshot.val();
        const course = getCourse(match.course);
        this.setState({ match, course ,loading: false });
      });
  }

  componentDidMount() {
    if (this.state.match) {
      return;
    }
    console.log('On matches');
    this.getMatchData();
  }
  
  componentWillUnmount() {
    console.log('Off matches');
    this.props.firebase.db.ref(`matches/${this.props.match_id}`).off();
  }
  
  render() {
    const { loading, match, course } = this.state;
    
    return (
      <div>
        { match && 
          <div>
            { (match.format !== 'stroke') && 
              <Points players={match.players} points={match.points} />
            }
            <br/>
            <Scores players={match.players} scores={match.scores} match_id={this.props.match_id} format={match.format}/>
          </div>
        }
      </div>
  );
  }
}

export default withFirebase(ScoreCard);