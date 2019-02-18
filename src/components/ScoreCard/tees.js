import React from 'react';
import { Row, Col } from 'antd';

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
        - 
      </Col>
     </Row>
    )}
        
 </span>
)

export default Distances;