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
  <span>
    { props.tees.map( (tee, index) =>
     <Row key={tee+'_distances'} type="flex" justify="center" align="middle">
       <Col span={4} className="scorecard_cell_title" style={{ background: `light${props.tee_colors[index]}`}}>
         {tee}
       </Col>
       
       { Object.keys(props.holes).map( (hole) =>
         <Col span={1} key={`${hole}_${tee}_id`} className="score_cell" style={{ background: `light${props.tee_colors[index]}`}}>
           {props.holes[hole].distance[tee]}
         </Col>
       )}

       <Col span={2} className="score_cell" style={{ background: `light${props.tee_colors[index]}`}}>
       { (props.total) ? (
          <span>{props.total}</span>
        ) : (
          <span>-</span>
        )}
         
        
      </Col>
     </Row>
    )}
        
 </span>
)

export default Distances;


export {Holes, Par, Handicap, Distances};