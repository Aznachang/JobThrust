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
    <div className='noteContainer' onClick={this.edit}>
      <div className='note-top'>
        <div className='note-created'>{this.props.convertDate(this.props.createdAt)}</div>
        <button className='remove-btn' onClick={context.remove}>x</button>
      </div>
      <div className='noteText'>{this.props.note}</div>
      <br/>
    </div>
    )
  }

  renderEditForm() {
    var context = this;
    return (
    <div className='noteContainer'>
      <textarea ref='newText' className='edit-note' defaultValue={this.props.note}></textarea>
      <br/>
      <button onClick={context.save} className='button-info'>Save</button>
    </div>
    )
  }

  remove() {
    this.props.deleteNoteText(this.props.noteId);
  }

  // when in editing mode Window
  save() {
    var val = this.refs.newText.value;
    this.props.updateNoteText(val, this.props.noteId);
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