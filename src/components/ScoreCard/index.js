import React, { Component } from 'react';

import { getCourse } from '../../courses';
import { Row } from 'antd';
import { withFirebase } from '../Firebase';

import PlayerPoints from '../PlayerPoints';
import PlayerScores from '../PlayerScores';
import {ScoreHeader} from './holes';
import Distances from './tees';


const Points = (props) => (
  <section>
  <h1>Points</h1>
  <ScoreHeader holes={props.course_holes} />
  { Object.keys(props.players).map( (player) =>
     <Row key={player+'_points'}>
        <PlayerPoints key={player} points={props.points[player]} player={props.players[player]} />
     </Row>
   )}
   </section>
) 


const Scores = (props) => (
  <section>
    <h1>Net Scores</h1>
     <ScoreHeader holes={props.course.holes} />
      <Distances holes={props.course.holes} tees={props.course.course_tees} tee_colors={props.course.tee_colors} />
    { Object.keys(props.players).map( (player) =>
       <Row key={player +'_scores'}>
         <PlayerScores
            player_username={props.players[player]}
            key={player}
            scores={props.scores}
            player={player}
            match_id={props.match_id}
            format={props.format}
            course_holes={props.course.holes}
          />
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
    const { match, course } = this.state;

    return (
      <div>
        { match && course && 
          <div>
            { (match.format !== 'stroke') && 
              <Points players={match.players} points={match.points} course_holes={course.holes}/>
            }
            <br/>
           
            <Scores players={match.players}
                    scores={match.scores}
                    match_id={this.props.match_id}
                    course={course}
                    format={match.format}/>
            
          </div>
        }
      </div>
  );
  }
}

export default withFirebase(ScoreCard);