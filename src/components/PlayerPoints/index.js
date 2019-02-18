import React, { Component } from 'react';
import { Row, Col } from 'antd';


class PlayerPoints extends Component {
                                     
  render() {
    const points = this.props.points;
    const total = points.reduce((a, b) => a + b, 0);
    return (
      <section>
        { points && 
          <Row type="flex" justify="space-around" align="middle" >
            <Col span={4} className="score_cell_title">
              {this.props.player}
            </Col>
      
            { points.map( (point, index) =>
              <Col span={1} className="score_cell" key={this.props.player+'_'+index+'_point'}> 
                {point}
              </Col>
            )}
      
            <Col span={2} className="score_cell">
              {total}
            </Col>
          </Row>
        }
      </section>
    );
  }
}

export default (PlayerPoints);