import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { InputNumber, List } from 'antd';


class HandicapChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHandicap: null,
      new_handicap: null,
      error: null,
      isEditing: false,
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onCancle = this.onCancle.bind(this);
  }
  
  toggleEdit() {
    (this.state.isEditing)
      ? this.setState({ isEditing: false })
      : this.setState({ isEditing: true })
  }
  
  onSubmit(e) {
    const { new_handicap } = this.state;
    const user = this.props.user;
    this.props.firebase.user(user.uid)
      .update({handicap: new_handicap})
      .then(() => {
      this.setState({ isEditing: false });
      window.location.reload();
      })
    .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  }
  
  onCancle() {
    const currentHandicap = (this.state.currentHandicap) ? this.state.currentHandicap : this.props.user.handicap;
    
    this.setState({ new_handicap: currentHandicap, isEditing: false })
  } 

  onChange(value) {
    this.setState({ new_handicap: value });
  }

  render() {
    const { new_handicap, error, isEditing } = this.state;
    const currentHandicap = (this.state.currentHandicap) ? this.state.currentHandicap : this.props.user.handicap;
    return (
      <span>
        { isEditing
          ? (
         <List.Item actions={[<div className="link_style" onClick={this.onSubmit}>update</div>,<div className="link_style" onClick={this.onCancle}>cancle</div>]}>
          <List.Item.Meta title="Handicap" 
            description={
              <InputNumber
                name="handicap"
                size="small"
                value={new_handicap}
                defaultValue={currentHandicap}
                onChange={this.onChange}
                min={-5}
                placeholder={currentHandicap}
              />
            } />
       
            {error && <p>{error.message}</p>}
    

          </List.Item>
          ) : (
            <List.Item actions={[<div className="link_style" href='' onClick={this.toggleEdit}>edit</div>]}>
            <List.Item.Meta title="Handicap" description={currentHandicap} />
            </List.Item>
          )
        }
      </span>
    );
  }
}

export default withFirebase(HandicapChangeForm);