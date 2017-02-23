import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import NoteContainer from './NoteContainer.jsx';

class Note extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false
    };

    this.renderNormal = this.renderNormal.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
  }

  edit() {
    this.setState({editing:true});
  }

  renderNormal() {
    var context = this;
    return (
    <div className='noteContainer'>
      <div className='noteText'>{this.props.children}</div>
      <br/>
      <button onClick={context.edit} className='button-primary'>Edit</button>
      <button onClick={context.remove} className='button-danger'>Remove</button>
    </div>
    )
  }

  renderEditForm() {
    var context = this;
    return (
    <div className='noteContainer'>
      <textarea ref='newText' defaultValue={this.props.children}></textarea>
      <br/>
      <button onClick={context.save} className='button-success'>Save</button>
    </div>
    )
  }

  remove() {
    this.props.deleteNoteText(this.props.index);
  }

  // when in editing mode Window
  save() {
    var val = this.refs.newText.value;
    console.log('New note: ', val);
    this.props.updateNoteText(this.refs.newText.value, this.props.index);
    // exit out of editing mode!
    this.setState({editing: false});
  }

  render() {
    if (this.state.editing) {
      return this.renderEditForm();
    } else {
      return this.renderNormal();
    }
  }
}

export default Note;