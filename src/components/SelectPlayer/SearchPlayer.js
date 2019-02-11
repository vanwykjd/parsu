import React, { Component } from 'react';

import { Select, Spin } from 'antd';

const Option = Select.Option;

class SearchPlayer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      player: undefined,
      fetching: false,
      data: [],
    };
    
    this.selectPlayer = this.selectPlayer.bind(this);
    this.searchPlayers = this.searchPlayers.bind(this);
  }
  
  componentDidMount() {
    if (this.props.selectedPlayer) {
      this.setState({ selectedPlayer: this.props.selectedPlayer });
      return;
    }
  }
  
  
  searchPlayers(value) {
     this.setState({ data: [], fetching: true });
     const playerOptions = this.props.playerOptions;
     const playerObjects = this.props.playerObjects;

     let data = [];
     for (var i = 0; i < playerOptions.length; i++) {
       const nameSearched = playerObjects[playerOptions[i]].username.toLowerCase();
       if (nameSearched.match(value.toLowerCase())) {
         data.push({key: playerOptions[i], value: playerObjects[playerOptions[i]].username });
       } 
     }
      
      this.setState({ data, fetching: false });
  }
  
  selectPlayer(player) {
    this.props.selectPlayer(player, this.props.player_key);
    this.setState({ player: player, data: [], fetching: false})
  }
  
  
 render() {  
    const { data, fetching } = this.state;
    const playerObjects = this.props.playerObjects;
    const selectedPlayer = (this.props.selectedPlayer) ? playerObjects[this.props.selectedPlayer].username : undefined;
    
    return (
    
      <Select
        style={{ width: 200, marginRight: 8 }}
        showSearch={true}
        allowClear
        showArrow={false}
        value={selectedPlayer}
        defaultActiveFirstOption={false}
        placeholder="Search Player"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.searchPlayers}
        onChange={this.selectPlayer}
      >
        {data.map(d => <Option key={d.key}>{d.value}</Option>)}
      </Select>

     
    );
  }
}

export default (SearchPlayer);