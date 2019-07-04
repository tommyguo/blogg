import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Image from './Image';

const PROF_PIC_LINK = '/prof_pic.png';
const AUTHOR_NAME = 'Tommy Guo';

class AuthorTag extends React.Component{
  formatDate(date) {
    return new Date(date).toDateString().split(' ').slice(1).join(' ');
  }

  render() {
    return (
      <div id='authorTag'>
        <Link to='/'>
          <Image id='profPic' src={PROF_PIC_LINK} />
        </Link>
        <h4 id='authorName'>{AUTHOR_NAME}</h4>
        <h4 id='publishedDate'>{this.formatDate(this.props.date)}</h4>

        <Router></Router>
      </div>      
    );
  }
}

AuthorTag.propTypes = {
  date: PropTypes.string,
};

export default AuthorTag;