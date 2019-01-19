import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { fetchGenres } from "../actions";
import { connect } from 'react-redux';

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchGenres());
  }

  render() {
    return <Navbar />;
  }
}

export default connect()(NavbarContainer);