import React, { Component } from 'react';

import { getCourse } from '../../courses';
import { Row } from 'antd';
import { withFirebase } from '../Firebase';

import PlayerPoints from '../PlayerPoints';
import PlayerScores from '../PlayerScores';
import { Holes, Distances } from './holes';


/**********************************************
  * Props: [:players, :points, :course_holes]
  * From: ScoreCard
**********************************************/
const Points = (props) => (
  <section>
  <h1>Points</h1>
  <Holes holes={props.course_holes} />
  { Object.keys(props.players).map( (player) =>
     <Row key={player+'_points'}>
        <PlayerPoints key={player} points={props.points[player]} player={props.players[player]} />
     </Row>
   )}
   </section>
) 

/*************************************************************
  * Props: [:players, : scores, :match_id, :course, :format]
  * From: ScoreCard
*************************************************************/
const Scores = (props) => (
  <section>
    <h1>Net Scores</h1>
     <Holes holes={props.course.holes} />
     
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

/****************************
  * Props: [:match_id]
  * From: Match in Match.js
****************************/
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
  
  // retrieves and sets Match and Course data
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
    console.log('Getting Match and Course Data');
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