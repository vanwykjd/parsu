import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Col, InputNumber } from 'antd';


class RoundItem extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      score: null,
    };

    this.updateScores = this.updateScores.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  
  updateScores(score) {
    this.props.firebase.db.ref(`matches/${this.props.match_id}/scores/${this.props.hole_id}/`).update({[this.props.player_id]: score.net });
    this.props.firebase.db.ref(`rounds/${this.props.round_id}/scores/${this.props.hole_id}/`).update(score);
  }
  
  
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
    const hole = this.props.hole_id;
    const score = (this.state.score) ? this.state.score.gross : this.props.score.gross;

    const strokes = this.props.strokes
     return (
       
       <InputNumber
         size='small'
         min={0}
         max={10}
         value={score}
         placeHoler={score}
         onChange={this.onChange}
         defaultValue={score}
       />
      
    );
  }
}

export default withFirebase(RoundItem);