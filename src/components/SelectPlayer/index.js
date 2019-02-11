import React, { Component } from 'react';

import {
  Form, Button, Icon
} from 'antd';

import SearchPlayer from './SearchPlayer';
import { withFirebase } from '../Firebase';

class SelectPlayer extends Component {
  constructor(props) {
    super(props);
    
     this.state = {
       playerKeys: [0],
       players: null,
       playerList: null,
       availablePlayers: null,
       selectedPlayers: {0: undefined},
     };
    
    this.getPlayers = this.getPlayers.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.selectPlayer = this.selectPlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    
  }
  
  getPlayers() {
    this.setState({loading: true })
    this.props.firebase.users().on('value', snapshot => {
      const playerObjects = snapshot.val();
  
      Object.keys(playerObjects).map(key => playerObjects[key] = { player_id: key, username: playerObjects[key].username, handicap: playerObjects[key].handicap });
      const playerList = Object.keys(playerObjects);
      
      this.setState({playerList: playerList, availablePlayers: playerList, players: playerObjects, loading: false });
    });
  }
  
  updateSelected(players) {
    const selectedPlayers = Object.values(players).filter(value => { return value !== undefined });
    const playerKeys = Object.keys(players);
    const availablePlayers = this.state.playerList.filter( selected => !selectedPlayers.includes(selected));
    const playerList = selectedPlayers.map(player => this.state.players[player]);
    this.props.selectPlayers(playerList);
    this.setState({availablePlayers, selectedPlayers: players, playerKeys});
  }
  
  
  selectPlayer(player, key) {
    let selectedPlayers = this.state.selectedPlayers;
    selectedPlayers[key] = player;
    this.updateSelected(selectedPlayers);
  }
  

  addPlayer() {
    let selectedPlayers = this.state.selectedPlayers;
    let playerKeys = this.state.playerKeys;
  
    const new_key = playerKeys[playerKeys.length - 1] + 1;
    
    playerKeys.push(new_key);
    selectedPlayers[new_key] = undefined;
    
    this.setState({ selectedPlayers: selectedPlayers, playerKeys: playerKeys});
  }
  
  
  removePlayer(key) {
    let selectedPlayers = this.state.selectedPlayers;
    let playerKeys = this.state.playerKeys;
    
    if (playerKeys[0] === key && playerKeys.length === 1) {
      playerKeys.shift();
      this.setState({ selectedPlayers: {0: undefined}, playerKeys: [0], availablePlayers: this.state.playerList});
      this.props.selectPlayers(null);
      return;
    }
    
     const key_index = playerKeys.indexOf(key);
     playerKeys.splice(key_index, 1);
     delete selectedPlayers[key];
    
     this.updateSelected(selectedPlayers);
  }
  
  
  componentDidMount() {
    if (this.state.players) {
      return;
    }
    this.getPlayers();
  }
  

  render() {
    const { selectedPlayers, playerKeys, availablePlayers } = this.state;
    const playerObjects = this.state.players;
    
    return (
      <section>
        { availablePlayers &&  
        <div>
            { playerKeys.map( (key, index) => 
                <Form.Item
                  label={index === 0 ? 'Select Players' : ''}
                  required={false}
                  key={key}>
                  <SearchPlayer
                      player_key={key}
                      selectedPlayer={selectedPlayers[key]}
                      playerObjects={playerObjects}
                      playerOptions={availablePlayers}
                      selectPlayer={this.selectPlayer}
                      removePlayer={this.removePlayer}
                  />
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removePlayer(key)}
                  />
                </Form.Item>
              )            
           }
          
          <Form.Item>
            <Button type="dashed" onClick={this.addPlayer} style={{ width: '100%' }} disabled={availablePlayers.length === 0}>
              <Icon type="plus" /> Add player
            </Button>
          </Form.Item>
        </div>
      }
     </section>
    );
  }
}

export default withFirebase(SelectPlayer);