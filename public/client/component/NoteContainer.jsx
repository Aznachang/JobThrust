import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios'
import Note from './Note.jsx';
import $ from 'jQuery';

export default class NoteContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [],
    };
    this.add = this.add.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  };

  // 'POST' A Note - this.props.applicationId
  add() {
    var context = this;
    var last = context.state.notes.length - 1;

    axios.post('/api/application/notes', {
      note:$('.add-Note').val()
    }).then(function(notes) {
      axios.get('/api/application/notes')
      .then(function(response){
        console.log('Getting All Notes: ', response.data);
        context.setState(notes:response.data);
      });
    });
    // notes - intially empty
    // var arr = this.state.notes;
    // arr.push('Write a note...'); // default Note
    // this.setState({notes: arr}); //update [notes]
  }

  // for 'Remove' Button
  removeNote(i) {
    var arr = this.state.notes;
    arr.splice(i,1);
    this.setState({notes:arr});
    console.log('[notes] after deletion: ', arr);
  }

  // for 'Edit' Button
  updateNote(newText, i) {
    // console.log('update button hit: ', this.refs.newText.value);
    // this.setState({notEditable: false});
    console.log('Updating Note');
    var arr = this.state.notes;
    arr[i] = newText;
    this.setState({notes: arr});
  }

  render() {
    var context = this;
    var displayNotes = this.state.notes.map((note, index) => {
      var context = this;
      return (
        <Note key={index} index={index}
        updateNoteText={context.updateNote} deleteNoteText={context.removeNote}>
         {note}
        </Note>
      )
    });

    return(
      <div>
      <textarea className ='add-Note'></textarea>
      <button onClick={this.add.bind(null, '')} className='button-info create'>Add new</button> <br/>
        <div className ='noteBoard'>
          {displayNotes}
        </div><br/>
      </div>
    );
    console.log('[Notes] is now: ', this.state.notes);
  }
}