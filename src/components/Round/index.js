import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withFirebase } from '../Firebase';

import { getCourse, getCourseHandicap } from '../../courses';
import SelectTeesForm from './SelectTeesForm';
import RoundScores from './RoundScores';
import {Handicap, Par} from '../ScoreCard/holes';

class Round extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      round: null,
      course: null,
      strokes: null,
      loading: false,
    };
    this.getRound = this.getRound.bind(this);
    this.selectTees = this.selectTees.bind(this);
    this.getStrokes = this.getStrokes.bind(this);
  }
  
  getRound() {
    this.setState({ loading: true });
    
    this.props.firebase.db.ref(`rounds/${this.props.round_id}`).on('value', snapshot => {
      const round = snapshot.val();
      const course = getCourse(round.course_id);
      const strokes = this.getStrokes(course, round.tees);
      this.setState({ round: round,
                      course: course,
                      strokes: strokes,
                      loading: false
                    });
      });
  }
  
  selectTees(tees) {
        this.props.firebase.db.ref(`rounds/${this.props.round_id}`)
            .update({tees: tees})
  }
  
  
  getStrokes(course, tees) {
        if (tees === 0) {
          return;
        }
        
        const course_handicap = getCourseHandicap(tees, this.props.user.handicap);
    
        let strokes = [];
        Object.keys(course.holes).map(key => 
          strokes[key] = 0    
        )
      
        let handicaps= [];
        Object.keys(course.holes).map(hole => handicaps[hole] = course.holes[hole].handicap[tees.tee_name] );
    
        
        let temp_arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for (let count = 0; count < course_handicap; count++) {
          temp_arr[count % 18] = temp_arr[count % 18] += 1;
        }
    
        temp_arr.map((stroke, index) =>
          strokes[index + 1] = stroke         
        )
        
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
    console.log('On Round');
    this.getRound();
  }
  
  componentWillUnmount() {
    console.log('Off Round');
    this.props.firebase.db.ref(`rounds/${this.props.round_id}`).off();
  }

                                     
  render() {
    const { round, course, strokes } = this.state;
    let total;
    if (round) {
      const hole_ids = Object.keys(round.scores);
      const gross_scores = hole_ids.map((hole) => parseInt(round.scores[hole].gross));
      total = gross_scores.reduce((a, b) => a + b, 0);
    }
    
    
    return (
      <div>
        {course && 
         <span>
         <Handicap holes={course.holes} tees={round.tees} />
         <Par holes={course.holes} tees={round.tees}/>
        </span>
        }
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
            <Row type="flex" justify="space-around" align="middle">
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