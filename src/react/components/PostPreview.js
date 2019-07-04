import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class PostPreview extends React.Component {
  render() {
    return (
      <div>
        <Link to={'/post/' + this.props.slug}>
          <div className='postPreview'>
            <h1>{this.props.title}</h1>
            <h2>{this.props.description}</h2>
            {this.props.image}
          </div>
        </Link>

        <Router></Router>
      </div>
    );
  }
}

PostPreview.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.element,
  content: PropTypes.element,
};

export default PostPreview;