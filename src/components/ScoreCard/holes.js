import React from 'react';
import { Row, Col } from 'antd';

/****************************************************************
  * Components used to format ScoreCard and Round course data *
****************************************************************/

const Holes = (props) => (
  <Row type="flex" justify="space-around" align="middle" >
    <Col span={4} className="scorecard_cell_title">
      Hole
    </Col>

    { Object.keys(props.holes).map( (hole) =>
      <Col span={1} key={hole+'_id'} className="scorecard_cell_title">
        {hole}
      </Col>
    )}
  
    <Col span={2} className="scorecard_cell_title">
      Total
    </Col>
  </Row>
)


const Par = (props) => (
  <Row type="flex" justify="space-around" align="middle" style={{ color: 'red' }} >
    <Col span={4} className="scorecard_cell_title">
      Par
    </Col>

    { Object.keys(props.holes).map( (hole) =>
      <Col span={1} key={hole+'_id'} className="scorecard_cell_title">
        {props.holes[hole].par}
      </Col>
    )}
  
    <Col span={2} className="scorecard_cell_title">
      {props.tees.par_for_tee}
    </Col>
  </Row>
)


const Handicap = (props) => (
  <Row type="flex" justify="space-around" align="middle" style={{ color: 'blue' }} >
    <Col span={4} className="scorecard_cell_title">
      Handicap
    </Col>

    { Object.keys(props.holes).map( (hole) =>
      <Col span={1} key={hole+'_id'} className="scorecard_cell_title">
        {props.holes[hole].handicap[props.tees.tee_name]}
      </Col>
    )}
  
    <Col span={2} className="scorecard_cell_title">
      
    </Col>
  </Row>
)


const Distances = (props) => (

     <Row key={props.tees.tee_name+'_distances'} type="flex" justify="center" align="middle">
       <Col span={4} className={`scorecard_cell_title ${props.tees.tee_color}`}>
         {props.tees.tee_name}
       </Col>
       
       { Object.keys(props.holes).map( (hole) =>
         <Col span={1} key={`${hole}_${props.tees.tee_name}_id`} className={`score_cell ${props.tees.tee_color}`}>
           {props.holes[hole].distance[props.tees.tee_name]}
         </Col>
       )}

       <Col span={2} className={`score_cell ${props.tees.tee_color}`}>
          {props.tees.total_distance}
       </Col>
     </Row>
)

export default Distances;


export {Holes, Par, Handicap, Distances};