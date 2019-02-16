import React, { Component } from 'react';
import { Row, Col, List } from 'antd';


class PlayerPoints extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      total: null,
      loading: false,
    };
    
    this.setPlayerPoints = this.setPlayerPoints.bind(this);
  }
  
  setPlayerPoints() {
    this.setState({ loading: true });
    const points = this.props.points;
    const total = points.reduce((a, b) => a + b, 0);
    this.setState({ points, total, loading: false});
  }
  
  componentDidMount() {
    console.log('Setting Player Points');
    this.setPlayerPoints();
  }
  
                                     
  render() {
    const { loading, total } = this.state;
    const points = this.props.points;
    return (
     <section>
        { points && 
          <Row>
          <Col span={4}>
            {this.props.player}
          </Col>
          { points.map( (point) =>
            <Col span={1}>{point}</Col>
          )}
          <Col span={2}>{total}</Col>
          </Row>
        }
      </section>
    );
  }
}

export default (PlayerPoints);