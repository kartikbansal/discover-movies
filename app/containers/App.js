import React from 'react';
import { Provider } from 'react-redux';
import Footer from '../components/Footer';
import MovieGridWraperContainer from './MovieGridWraperContainer.js';
import configureStore from '../store';
import NavbarContainer from './NavbarContainer';
import MoviePosterContainer from './MoviePosterContainer';

const store = configureStore();

const App = () => (
  <div className="root">
    <Provider store={store}>
      <React.Fragment>
        <NavbarContainer />
        <MovieGridWraperContainer />
        <Footer />
        <MoviePosterContainer />
      </React.Fragment>
    </Provider>
  </div>
);

export default App;
