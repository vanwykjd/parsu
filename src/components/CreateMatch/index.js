import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { Form, Row, Button } from 'antd';

import SelectPlayer from '../SelectPlayer';
import SelectCourse from '../SearchCourse';
import SelectFormat from '../SelectFormat';


const INITIAL_STATE = {
  match_id: '',
  date: null,
  course: null,
  format: null,
  players: null,
  loading: false,
  error: null,
};  

const CreateMatchPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className='account_form'>
        <Row type="flex" justify="center" align="middle">
          <h1>Create Match</h1>
       
          <CreateMatchForm />
        </Row>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class CreateMatchFormBase extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectPlayers = this.selectPlayers.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.selectFormat = this.selectFormat.bind(this);
  }
  
  
  componentDidMount() {
    this.setState({ loading: true });
    const refKey = this.props.firebase.matches().push().key;
    
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1; 

    const yyyy = date.getFullYear();

    const today = mm + '/' + dd + '/' + yyyy;
   
    this.setState({ 
      match_id: refKey,
      date: today,
      loading: false
    });
  }
  
  selectPlayers(players) {
    console.log('Selected Players: ', players);
    this.setState({ players });
  }
  
  selectCourse(course) {
    console.log('Selected Course: ', course );
    this.setState({course: course });
  }
  
  selectFormat(format) {
    console.log('Selected Format: ', format);
    this.setState({format: format });
  }
  
  setPlayerObjects(players) {
    console.log('Set Players', players);
    this.setState({})
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  
  onSubmit(e) {
    let roundsArr = [];
    let count = 0;
  
    const course_id = this.state.course.course_id;
    const course = this.state.course;
    const format = this.state.format;
    const playerList = this.state.players;
    const match_id = this.state.match_id;
    const date = this.state.date;
    
    let scoreObject = {};
    let roundObject = {};
    let pointObject = {};
    let playerPoints = {};
    
    
    
    playerList.map(player => 
      playerPoints[player.player_id] = 0  
    )
    
    for ( let i = 0; i < course.num_of_holes; i++) {
      scoreObject[i + 1] = playerPoints;
      roundObject[i + 1] = { net: 0, gross: 0 };
      pointObject[i + 1] = 0;
    }

    for (count; count < playerList.length; count++) {
      let round = this.props.firebase.db.ref('rounds').push().key;
      roundsArr.push(round);
    }
    
    this.props.firebase.db.ref(`matches/${match_id}`).set({status: 0, format: format, course: course_id })
    .then(() => { 
      playerList.map( (player, index) =>
        this.props.firebase.db.ref(`users/${player.player_id}/matches/${match_id}`).set({round_id: roundsArr[index], date_created: date, course_name: course.course_name, course_id: course_id})
      )
    })
    .then(() => { 
      playerList.map( (player,index) =>
       this.props.firebase.db.ref(`rounds/${roundsArr[index]}`).set({player_id: player.player_id, tees: 0, match_id: match_id, course_id: course_id, status: 0, scores: roundObject })
      )
    })
    .then(() => {
      playerList.map( (player,index) =>
       this.props.firebase.db.ref(`matches/${match_id}/rounds/`).update({[player.player_id]: roundsArr[index] })
      )
    })
    .then(() => { 
      playerList.map( (player,index) =>
       this.props.firebase.db.ref(`matches/${match_id}/players/`).update({ [player.player_id]: player.username })
      )
    })
    .then(() => { 
      for ( let i = 0; i < course.num_of_holes; i++) {
       this.props.firebase.db.ref(`matches/${match_id}/scores/`).update(scoreObject)
      }
    })
    .then(() => { 
      playerList.map( (player,index) =>
       this.props.firebase.db.ref(`matches/${match_id}/points/`).update({[player.player_id]: pointObject})
      )
    })
    .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.MATCHES);
    })

    .catch(error => {
        this.setState({ error });
    })

    e.preventDefault();

  }
  

  render() {
    const { course, format, players, error } = this.state;
    const isInvalid =
      format === '' ||
      course  === '' ||
      players  === '';
    
    return (
      <Form onSubmit={this.onSubmit}>
        <SelectCourse selectCourse={this.selectCourse} course={course}/>
        <SelectFormat selectFormat={this.selectFormat} />     
        <SelectPlayer selectPlayers={this.selectPlayers}/>
    
        <Row type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
            Create Match
          </Button>
        </Row>
      
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const CreateMatchLink = () => (
  <div className="create_match_link">
    <Link to={ROUTES.CREATE_MATCH}>Create Match</Link>
  </div>
);

const CreateMatchForm = compose(
  withRouter,
  withFirebase,
)(CreateMatchFormBase);

export { CreateMatchForm, CreateMatchLink};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CreateMatchPage);