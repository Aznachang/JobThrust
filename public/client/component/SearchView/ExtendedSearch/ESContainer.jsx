import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import ESSearches from './ESSearches.jsx';
import ESResults from './ESResults.jsx';
import ESViewJob from './ESViewJob.jsx';

export default class ESContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searches: [],
      results: [],
      modalIsOpen: false,
      viewing: 'searches',
      jobview: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getSearches = this.getSearches.bind(this);
    this.selectResults = this.selectResults.bind(this);
    this.backToSearches = this.backToSearches.bind(this);
    this.backtoResults = this.backtoResults.bind(this);
    this.viewJob = this.viewJob.bind(this);
    this.deleteSearch = this.deleteSearch.bind(this);
    this.addSearch = this.addSearch.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true, viewing: 'searches'});
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
    this.setState({results: selected, viewing: 'results'});
  }

  backToSearches() {
    this.setState({viewing: 'searches'});
  }

  backtoResults() {
    this.setState({viewing: 'results'});
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

  viewJob(i) {
    console.log(this.state.results[i].link);
    this.setState({jobview: this.state.results[i]})
    this.setState({viewing: 'jobpage'});
  }

  deleteSearch(id) {
    var context = this;

    axios.post('/api/extsearch/delete', {
      searchId: id
    }).then(function(res) {
      context.getSearches();
    }).catch(function(err) {
      console.log('Error attempting to delete search.');
    });
  }

  addSearch(title, city, label) {
    var context = this;

    axios.get('/api/userdata').then(function(res) {
      axios.post('/api/extsearch/add', {
        title: title,
        city: city,
        label: label,
        email: res.data.email,
      }).then(function(response) {
        alert('Search successfully submitted.  You will be notified by e-mail when it is done!');
      }).catch(function(error) {
        console.log('Error posting new search.');
      });
    }).catch(function(err) {
      console.log('Error posting new search.');
    });
  }
  

  render() {
    var listDisplay;
    if (this.state.viewing === 'searches') {
      listDisplay = <ESSearches selectResults={this.selectResults} addSearch={this.addSearch} deleteSearch={this.deleteSearch} searches={this.state.searches} />
    } else if (this.state.viewing === 'results') {
      listDisplay = <ESResults backToSearches={this.backToSearches} results={this.state.results} viewJob={this.viewJob} />
    } else {
      listDisplay = <ESViewJob backToResults={this.backtoResults} job={this.state.jobview} />
    }

    return (
      <div className='ext-search-container'>
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
        <div className='ext-search-title'><h3>Extended Search</h3></div>
        <div className='add-app-btn' onClick={this.openModal}>VIEW/EDIT YOUR SEARCHES</div>
      </div>
    )
  }
}