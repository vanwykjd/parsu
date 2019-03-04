import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ScoreItem from './ScoreItem'

/***********************************************************************************
  * Props: [:player_username, :scores, :player, :match_id, :format, :course_holes]
  * From: Scores in ScoreCard.js
***********************************************************************************/
class PlayerScores extends Component {
                           
  render() {
    const hole_ids = Object.keys(this.props.scores);
    const scores = this.props.scores.map( (score) => 
      score[this.props.player]                                    
    );
    const total = scores.reduce((a, b) => a + b, 0);

    return (
      <section>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={4} className="score_cell_title">
            {this.props.player_username}
          </Col>
      
          { hole_ids.map( (hole_id) => 
            <Col span={1} key={this.props.player+'_'+hole_id}className="score_cell">
              <ScoreItem 
                player_id={this.props.player}
                score={this.props.scores[hole_id][this.props.player]}
                scores={this.props.scores[hole_id]}
                hole_id={hole_id}
                match_id={this.props.match_id}
                format={this.props.format}
                updateScores={this.setPlayerScores}
              />
            </Col>
          )}
  
          <Col span={2} className="score_cell">
            {total}
          </Col>
        </Row>
      </section>
    );
  }
}

export default (PlayerScores);