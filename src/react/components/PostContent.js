import React from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';

import '../../css/postContent.css';

class PostContent extends React.Component {
  // converts from Markdown to HTML
  transformHTML(content) {
    const md = new Remarkable();

    return { __html: md.render(content) };
  }

  render() {
    return (
      <div id='content' dangerouslySetInnerHTML={this.transformHTML(this.props.content)}></div>
    );
  }
}

PostContent.propTypes = {
  content: PropTypes.string,
};

export default PostContent;