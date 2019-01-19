import _ from 'lodash';
import React from 'react';
import api from '../utils/api.js';
import DropdownListContainer from './DropdownListContainer.js';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResults: [],
      showSearchResults: false,
    };
    this.searchBoxRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.closeSearchResults = this.closeSearchResults.bind(this);
  }
  
  handleInputChange(evt) {
    const val = evt.target.value;
    this.setState(() => ({ searchText: val }));
    const debouncedSearch = _.debounce(() => this.searchMovie(), 300);
    debouncedSearch();
  }
  
  handleInputFocus() {
    this.state.searchText.length > 1 && this.setState(() => ({ showSearchResults: true }));
  }
  
  handleClickOutside(evt) {
    if (this.searchBoxRef && !this.searchBoxRef.current.contains(evt.target)) {
      this.setState(() => ({ showSearchResults: false }));
    }
  }
  
  closeSearchResults() {
    this.setState(() => ({ showSearchResults: false }));
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
    
  searchMovie() {
    const { searchText } = this.state;
    searchText.length > 1
      ? api.searchMovie(searchText)
          .then(data => {
            this.setState(() => {
              return {
                searchResults: data.results.filter((movie) => movie.vote_count > 50).slice(0,5), 
                showSearchResults: true
              };
            });
          })
      : this.setState(() => ({ showSearchResults: false }));
  }

  render() {
    const { text, showSearchResults, searchResults } = this.state;

    return (
      <div className="search-box-container" ref={this.searchBoxRef}>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={text}
          placeholder="Search By Title..."
          onFocus={this.handleInputFocus}
        />
        { showSearchResults && 
          <DropdownListContainer 
            itemsList={searchResults} 
            onClick={this.closeSearchResults} 
          />
        }
      </div>
    );
  }
}

export default SearchBox;
