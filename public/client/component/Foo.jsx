import React from 'react';

<<<<<<< HEAD
export default class Foo extends React.Component {
  render() {
    return (
      <div className="foo">
        <h1 className="bar"></h1>
        <p className="bar">Bar</p>
      </div>
  )}
}
=======
class foo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'foo'>
        <ul className ='bar'>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <textarea className ='bar'></textarea>
      </div>
    )
  }
}

export default foo;
>>>>>>> Added tests for NotesContainer and Notes
