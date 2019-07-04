import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './pages/Home';
import Post from './pages/Post';
import Publish from './pages/Publish';
import UploadImage from './pages/UploadImage';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/post/:title' component={Post} />
        <Route path='/publish' component={Publish} />
        <Route path='/upload-image' component={UploadImage} />
      </Router>
    );
  }
}

export default AppRouter;