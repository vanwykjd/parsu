import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Select } from 'antd';

const Option = Select.Option;

class RoundItem extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      score: null,
    };

    this.updateScores = this.updateScores.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  /**************************************************************************************
    * Updates Match/[:match_id]/scores/[:hole_id] data when score input has been entered
    * Updates Rounds/[:match_id]/scores/[:hole_id] data when score input has been entered
    * Enables for scores to be updated by :hole_id in real-time 
  **************************************************************************************/
  
  updateScores(score) {
    this.props.firebase.db.ref(`matches/${this.props.match_id}/scores/${this.props.hole_id}/`).update({[this.props.player_id]: score.net });
    this.props.firebase.db.ref(`rounds/${this.props.round_id}/scores/${this.props.hole_id}/`).update(score);
  }
  
  // *** Handles user score input ***
  onChange(value) {
    const strokes = this.props.strokes;

    let scoreObject = {};
    if (value === 0) {
      scoreObject = { gross: 0, net: 0 };
    } else {
      const net_score = value - strokes;
      if (net_score < 0 ) {
         scoreObject = { gross: value, net: 0 }
      } else {
         scoreObject = { gross: value, net: net_score }
      }
     
    }
    this.updateScores(scoreObject);
    this.setState({score: scoreObject});
  }
  
                         
  render() {
    const score = (this.state.score) ? this.state.score.gross : this.props.score.gross;
   
    // *** Initializes select options for score input ***
    const scores = [1,2,3,4,5,6,7,8,9,10];
    
    return (
      <Select
        showArrow={false}
        className='round_input'
        defaultValue={this.props.hole_par}
        style={{ width: "100%", textAlign: "center"}}
        onChange={this.onChange}
        value={score}
        placeholder={this.props.hole_par}
      >
        {scores.map(score => <Option key={score}>{score}</Option>)}
      </Select>
    );
  }
}

export default withFirebase(RoundItem);