import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleChange(text) {
    this.setState(() => ({text: text}));
    this.props.onSearchTextChange(text);
  }

  render() {
    return (
      <div>
        <input
          onChange={(evt) => this.handleChange(evt.target.value)}
          type="text"
          value={this.state.text}
          placeholder="Search By Title..."
          onFocus={() => this.props.onFocus()}
          onBlur={() => this.props.onBlur()} />
      </div>
    )
  }
}

export default SearchBar;
