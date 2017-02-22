import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios'
// import Comment from './Comment.jsx';
import $ from 'jQuery';

class CommentContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: [],
      notEditable: true,
    };
    this.saveComment = this.saveComment.bind(this);
  };

  // 'Add' Comment
  add() {
    // comments - intially empty
    var arr = this.state.comments;
    arr.push('Write a note...'); // default comment
    this.setState({comments: arr}); //update [comments]
  }

  // for 'Save Button'
  saveComment(index) {
    console.log('Index Selected: ', index);
    console.log('refs: ', this.refs.commentVal);
    var arr = this.state.comments;
    arr[index.index] = this.refs.commentVal.value;
    this.setState({comments: arr});

    console.log('Update [Comments]: ', this.state.comments);
  }

  // for 'Remove' Button
  removeComment(i) {
    // console.log('Removing comment of Index: ', i.index);
    console.log('Removing comment index: ', i.index);
    var arr = this.state.comments;
    arr.splice(i.index,1);
    this.setState({comments:arr});
    console.log('[comments] after deletion: ', arr);
  }

  // for 'Edit' Button
  updateComment(speech, index) {
    console.log(this.refs.commentVal);
    this.setState({notEditable: false});
  }

  render() {
    var displayComments = this.state.comments.map((comment, index) => {
      return (
        <span key={index}>
          <br/><br/>
          <textarea ref='commentVal' rows="7" cols="50" readOnly={this.state.notEditable}>{comment}</textarea><br/>
          <button onClick= {this.updateComment.bind(this, {comment}, {index})}>Edit</button>
          <button onClick= {this.removeComment.bind(this, {index})}>Remove</button>
          <button onClick= {this.saveComment.bind(this, {index})}>Save</button>
        </span>
      );
    });

    return (
      <div className ='commentBox'>
        <button onClick={this.add.bind(this)} className='button-info create'>Add New</button>
        {displayComments}
      </div>
    )
  };
}

export default CommentContainer;