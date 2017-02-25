import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';
import axios from 'axios'
import Note from './Note.jsx';
import $ from 'jQuery';

export default class NoteContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // [{Note1}, {Note2}, etc...]
      notes: [],
    };
    this.add = this.add.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
  };

  // 'POST' A Note - this.props.applicationId
  add() {
    var context = this;

    if ($('add-note').val() !== '') {
      axios.post('/api/application/notes', {
        note:$('.add-note').val(),
        applicationId: context.props.appId
      }).then(function(notes) {
        context.getNotes();
        $('.add-note').val('');
      });
    }
  }

  // for 'Remove' Button
  removeNote(noteId) {
    var context = this;

    axios.delete('/api/application/notes/' + noteId).then(function(noteDeleted){
      console.log('Deletion of Note Triggered!');
      context.getNotes();
    });
  }

  // for 'Edit' Button
  updateNote(newText, noteId) {
    var context = this;

    axios.post('/api/application/notes', {
      note: newText,
      applicationId: context.props.appId,
      id: noteId
    }).then(function(response){
      context.getNotes();
    });
  }

  // Get Notes
  getNotes() {
    var context = this;

    axios.get('/api/application/' + context.props.appId + '/notes')
    .then(function(response){
      console.log('Getting All Notes: ', response.data);
      var notes = response.data.sort(function(a, b) {
        return b.id - a.id;
      });
      context.setState({notes: notes});
    });
  }

  componentDidMount() {
    // Get Existing Notes Upon First Load
    this.getNotes();
  }

  render() {
    return(
      <div className='notes-container'>
        <textarea className='add-note' placeholder="Add new note..."></textarea>
        <button onClick={this.add.bind(null, '')} className='button-info create'>Add</button> <br/>
        <div className ='noteBoard'>
          {this.state.notes.map((note, index) =>
            <Note key={index} index={index} updateNoteText={this.updateNote} deleteNoteText={this.removeNote} note={note.note} createdAt={note.createdAt} noteId={note.id} appId={note.applicationId}/>
          )}
          <br/>
        </div>
      </div>
    );
  }
}