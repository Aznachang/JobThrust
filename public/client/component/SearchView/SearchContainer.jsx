import React from 'react';
import { browserHistory } from 'react-router';
import SearchBar from './SearchBar.jsx';
import axios from 'axios'
import SearchResultsContainer from './SearchResultsContainer.jsx';
import ESContainer from './ExtendedSearch/ESContainer.jsx';
import $ from 'jQuery';
import Modal from 'react-modal';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      location: null,
      results: [],
      recommendations: [],
      modalIsOpen: false,
      modalInfo: [],
      modalTitle: '',
      modalCompany: '',
      modalLoc: '',
      modalLink: '',
      currentPage: 1
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.removeJob = this.removeJob.bind(this);
    this.addJob = this.addJob.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  };


  openModal(jobkey, index) {
    this.setState({
      modalIsOpen: true,
      modalLoc: this.state.results[index].formattedLocation,
      modalTitle: this.state.results[index].jobtitle,
      modalCompany: this.state.results[index].company,
      modalLink: this.state.results[index].url
    });
    this.getInfo(jobkey, index);
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({modalIsOpen: false, modalInfo: []});
  }

  // GET JOBS FROM INDEED API
  getJobs(event) {
    if (event) {
      event.preventDefault();
    }
    var context = this;
    //JSONP request to bypass CORS HEADERS
    $.getJSON("http://api.indeed.com/ads/apisearch?callback=?", {
      publisher: '5024495540845813', // TODO: HIDE THIS!!!
      l: context.state.location,
      q: context.state.search,
      limit: 1000,
      start: ((this.state.currentPage - 1) * 25) + 1,
      format: 'json',
      v: '2'
    }, function(json){
      context.setState({
        results: json.results,
        info: {}
      });
    });
  }

  nextPage() {
    var currPage = this.state.currentPage;
    var next = currPage + 1;
    if (currPage <= 40) {
      this.setState({currentPage: next}, function() {
        this.getJobs();
      });
    }
  }

  prevPage() {
    var currPage = this.state.currentPage;
    if (currPage > 1) {
      this.setState({currentPage: currPage - 1}, function() {
        this.getJobs();
      });
    }
  }

  /**********SEARCH RESULT ICON FUNCTIONS**********/

  // ADD JOB TO DB
  addJob(result, index) {
    var context = this;
    axios.get('/api/jobs/' + result.jobkey).then(function(description) {
      axios.post('/api/job', {
        title: result.jobtitle,
        description: result.snippet,
        fullDescription: description.data,
        company: result.company,
        key: result.jobkey
      }).then(function() {
        context.state.results.splice(index, 1)
        context.setState({
          results: context.state.results,
          info: {}
        })
      })
    })
  }

  // REMOVE INDIVIDUAL JOB COMPONENT FROM VIEW (NOT DB)
  removeJob(jobIndex) {
    var context = this;
    context.state.results.splice(jobIndex, 1)
    context.setState({
      results: context.state.results,
      info: {}
    })
  }


  // SCRAPE INFO FROM INDEED JOB AND SET IT AS STATE TO DISPLAY
  getInfo(jobkey, index) {
    var context = this;
    $.get("/api/jobs/" + jobkey)
    .done(function(response) {
      var responseChunked = response.split('\n');
      context.setState({
        modalInfo: responseChunked,
        modalIndex: index
      });
    })
  }

  /********************/

  // HANDLES STATE RELATED TO FORMS
  searchHandler(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({currentPage: 1});
  }

  componentWillMount() {
  }

  render() {

    var resultHeaderShow = function() {
      if (this.state.results.length !== 0) {
        return (<SearchResultsContainer info={this.state.info} openModal={this.openModal} results={this.state.results} addJob={this.addJob} getInfo={this.getInfo} removeJob={this.removeJob} />)
      }
    }

    return(
      <div className='search-view'>
       <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >

          <div className="desc-header">
            <div>{this.state.modalTitle}</div>
            <div>{this.state.modalCompany} ({this.state.modalLoc})</div>
          </div>
          <div className="inner-container on-demand-desc">
            { this.state.modalInfo.map((chunk, index) =>
              <span key={index}>{chunk}<br/></span>
            ) }
          </div>
          <div className='indeed-url'>
            <a target="_blank" href={this.state.modalLink}>View this job on Indeed.</a>
          </div>

        </Modal>
       <ESContainer />
       <div className='search-container'>
         <div className="page-header"><h3>Instant Search (powered by Indeed)</h3></div>
         <SearchBar getJobs={this.getJobs} searchHandler={this.searchHandler} />
       </div>
       { this.state.results.length > 0 ? (
         <SearchResultsContainer info={this.state.info} openModal={this.openModal} results={this.state.results} prevPage={this.prevPage} nextPage={this.nextPage} currPage={this.state.currentPage} addJob={this.addJob} getInfo={this.getInfo} removeJob={this.removeJob} />
       ) : (
         <div></div>
       ) }
      </div>
    )
  };
};