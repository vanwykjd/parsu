import React, { Component } from 'react';
import { withFirebase } from '../Firebase';


class ScoreItem extends Component {
  constructor(props) {
    super(props);
    
    this.updatePoints = this.updatePoints.bind(this);
  }
  
  updatePoints() {
    if (this.props.format === 'stroke') {
      return
    }
    if (this.props.format === 'match') {
      const scores = Object.values(this.props.scores);
    
      const playerObjects = Object.entries(this.props.scores).map((entry  => ({
        player_id: entry[0], score: entry[1], points: 0
      })));

      const min = Math.min(...scores);
      const minIndex = scores.indexOf(min);
      playerObjects[minIndex].points = 1;
      scores.splice(minIndex, 1);


      for (let i = 0; i < scores.length; i++) {
        if (scores[i] === min) {
          playerObjects[minIndex].points = 0;
        }
      }

      playerObjects.map(player => 
        this.props.firebase.db.ref(`matches/${this.props.match_id}/points/${player.player_id}/`).update({[this.props.hole_id]: player.points})
      )
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.score !== prevProps.score) {
      console.log('Updating Player Points');
      this.updatePoints();
    }
  } 
  
                     
  render() {
    
    return (
      <span>
        {this.props.scores[this.props.player_id]}
      </span>
    );
  }
}

export default withFirebase(ScoreItem);