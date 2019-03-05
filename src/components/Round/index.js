import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withFirebase } from '../Firebase';

import { getCourse, getCourseHandicap } from '../../courses';
import SelectTeesForm from './SelectTeesForm';
import RoundScores from './RoundScores';
import { Holes, Distances, Handicap, Par } from '../ScoreCard/holes';

class Round extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      round: null,
      course: null,
      strokes: null,
      loading: false,
    };
    this.getRoundData = this.getRoundData.bind(this);
    this.selectTees = this.selectTees.bind(this);
    this.getStrokes = this.getStrokes.bind(this);
  }
  
  // *** Retrieves and sets Round data for current round ***
  getRoundData() {
    this.setState({ loading: true });
    
    this.props.firebase.db.ref(`rounds/${this.props.round_id}`).on('value', snapshot => {
      const round = snapshot.val();
      const course = getCourse(round.course_id);
      const strokes = this.getStrokes(course, round.tees);
      this.setState({ 
        round: round,
        course: course,
        strokes: strokes,
        loading: false
      });
    });
  }
  
  /*********************************************************************
    * Updates Round[:tee] data when Round hasn't been initiated 
    * Needed as param for getStrokes() to calc player's course handicap
  *********************************************************************/
  selectTees(tees) {
    this.props.firebase.db.ref(`rounds/${this.props.round_id}`)
      .update({tees: tees})
  }
  
  /*********************************************************************
    * Calculates player's course handicap using params[course, tees
    * Assigns amount of strokes given for each hole based on handicaps
  *********************************************************************/
  getStrokes(course, tees) {
    if (tees === 0) {
      return;
    }
    
  // *** Calculates course handicap base on props.user.handicap ***
    const course_handicap = getCourseHandicap(tees, this.props.user.handicap);
    
    let strokes = [];
    Object.keys(course.holes).map(key => 
      strokes[key] = 0    
    )
      
    let handicaps= [];
    Object.keys(course.holes).map(hole => handicaps[hole] = course.holes[hole].handicap[tees.tee_name] );
    
  /*************************************************************************
    * Iterates over tmp_arr [player's course handicap] times and adds += 1
    * Assigns amount of strokes given for each hole based on handicaps
  *************************************************************************/     
    let temp_arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let count = 0; count < course_handicap; count++) {
      temp_arr[count % 18] = temp_arr[count % 18] += 1;
    }
    
  // *** Assigns calculated values from temp_arr to strokes Object keys based on index ***
    temp_arr.map((stroke, index) =>
      strokes[index + 1] = stroke         
    )
        
  // *** Assigns strokes value to each hole base on hole handicap ***
    let round_strokes = {};
    Object.keys(course.holes).map((hole) =>
      round_strokes[hole] = strokes[handicaps[hole]]
    )
    
    return round_strokes;
  }
  
  componentDidMount() {
    if (this.state.round) {
      return;
    }
    console.log('Getting Round Data');
    this.getRoundData();
  }
  
  componentWillUnmount() {
    console.log('Off Round');
    this.props.firebase.db.ref(`rounds/${this.props.round_id}`).off();
  }

  render() {
    const { round, course, strokes } = this.state;
    console.log(round);
    let total;
    if (round) {
      const hole_ids = Object.keys(round.scores);
      const gross_scores = hole_ids.map((hole) => parseInt(round.scores[hole].gross));
      total = gross_scores.reduce((a, b) => a + b, 0);
    }
    
    
    return (
      <div>
        <br/>
      
        <Row type="flex" justify="space-around" align="middle">
          { round && (round.tees === 0) && 
            <SelectTeesForm
              course={course}
              user={this.props.user}
              selectTees={this.selectTees}
            />
          }
        </Row>
  
        { round && (round.tees !== 0) && 
          <section>
            <h1>Gross Score</h1>
            <Holes holes={course.holes} />
            <Distances holes={course.holes} tees={round.tees} />
            <Handicap holes={course.holes} tees={round.tees} />
            <Par holes={course.holes} tees={round.tees}/>
            <Row type="flex" justify="space-around" align="top">
              <Col span={4} className="score_cell_title">
                {this.props.user.username}
              </Col>
              
              { Object.keys(round.scores).map( (hole_id) =>
                <Col span={1} key={hole_id}>                          
                  <RoundScores
                    score={round.scores[hole_id]}
                    hole_id={hole_id}
                    hole_par={course.holes[hole_id].par}
                    match_id={round.match_id}
                    strokes={strokes[hole_id]}
                    player_id={this.props.user.uid}
                    round_id={this.props.round_id}
                  />
                </Col>
              )}        

              <Col span={2} className="score_cell">
                {total}
              </Col>
            </Row>
          </section>
        }
      </div>
    );
  }
}

export default withFirebase(Round);