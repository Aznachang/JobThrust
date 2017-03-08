import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import ESSearches from './ESSearches.jsx';
import ESResults from './ESResults.jsx';

export default class ESContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searches: [],
      results: [],
      modalIsOpen: false,
      viewingSearches: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getSearches = this.getSearches.bind(this);
    this.selectResults = this.selectResults.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true, viewingSearches: true});
  }

  afterOpenModal() {
    this.getSearches();
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  selectResults(index) {
    console.log('Displaying results for search at index', index);
    var selected = this.state.searches[index].results;
    this.setState({results: selected, viewingSearches: false});
  }

  getSearches() {
    var context = this;

    axios.get('/api/userdata').then(function(res) {
      axios.get('/api/extsearch/' + res.data.email).then(function(response) {
        console.log('Retrieved search data:', response);
        context.setState({searches: response.data});
      });
    });
  }
  

  render() {
    var listDisplay;
    if (this.state.viewingSearches) {
      listDisplay = <ESSearches selectResults={this.selectResults} searches={this.state.searches} />
    } else {
      listDisplay = <ESResults results={this.state.results} />
    }

    return (
      <div className='search-container'>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="inner-container">
            {listDisplay}
          </div>
        </Modal>
        <div className="page-header">Extended Search</div>
        <div className='add-app-btn' onClick={this.openModal}>VIEW/EDIT YOUR SEARCHES</div>
      </div>
    )
  }
}