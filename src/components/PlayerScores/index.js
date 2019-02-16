import React, { Component } from 'react';
import { Row, Col, List } from 'antd';
import ScoreItem from './ScoreItem'

class PlayerPoints extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      total: null,
      loading: false,
    };
    
    this.setPlayerScores = this.setPlayerScores.bind(this);
  }
  
  setPlayerScores() {
    this.setState({ loading: true });
    const scores = this.props.scores.map( (score) => 
      score[this.props.player]                                    
    )
    const total = scores.reduce((a, b) => a + b, 0);
    this.setState({ total, loading: false});
  }
  
  
  componentDidMount() {
    console.log('Setting Player Scores');
    this.setPlayerScores();
  }
  
                           
  render() {
    const { loading, total } = this.state;
    const hole_ids = Object.keys(this.props.scores);

    return (
     <section>
        { hole_ids && 
          <Row>
          { hole_ids.map( (hole_id) => 
            <ScoreItem 
              player_id={this.props.player}
              score={this.props.scores[hole_id][this.props.player]}
              scores={this.props.scores[hole_id]}
              hole_id={hole_id}
              match_id={this.props.match_id}
              format={this.props.format}
              updateScores={this.setPlayerScores}
             />
          )}
          <Col span={2}>{total}</Col>
          </Row>
        }
      </section>
    );
  }
}

export default (PlayerPoints);