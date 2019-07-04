import React from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';

import '../../css/post/post.css';
import '../../css/postContent.css';
import PostHeader from '../components/PostHeader';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: false,
      title: null,
      description: null,
      banner: null,
      content: null,
      date: null,
    };
  }
  
  componentDidMount() {
    fetch(`/api/post/${this.props.match.params.title}`, {
      headers: {
        'Accept': 'application/json',
      }, 
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          const post = res;

          this.setState({
            isLoaded: true,
            title: post.title,
            description: post.description,
            banner: post.banner,
            content: post.content,
            date: post.updatedAt,
          });
        } else {
          throw Error;
        }
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
          error: true,
        });
      });
  }

  getContent() {
    const md = new Remarkable();

    return { __html: md.render(this.state.content) };
  }

  render() {
    if (this.state.isLoaded) {
      if (!this.state.error) {
        return (
          <div id='post'>
            <PostHeader 
              title={this.state.title}
              description={this.state.description}
              date={this.state.date}
              banner={this.state.banner}
            />

            <div id='content' dangerouslySetInnerHTML={this.getContent()}></div>
          </div>
        );
      } else {
        return (
          <div id='post'>
            <div id='postHeader'>
              <h1>Post Not Found</h1>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

Post.propTypes = {
  match: PropTypes.object,
};

export default Post;