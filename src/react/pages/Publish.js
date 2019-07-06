import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import '../../css/publish/publish.css';
import '../../css/postContent.css';
import PostHeader from '../components/PostHeader';
import PostContent from '../components/PostContent';
import GoogleSignIn from '../components/GoogleSignIn';

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      slug: 'url-slug',
      title: 'Post Title', 
      description: 'Post Description',
      banner: 'Banner Image URL',
      content: 'Post Content',
      publishingError: false,
      googleIdToken: null,
    };
  }

  handleSignIn(googleIdToken) {
    this.setState({
      googleIdToken: googleIdToken
    });
  }

  handleFormChange(e) {
    const name = event.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  getPublishingError() {
    if (this.state.publishingError) {
      return <div className='error'>There was an error publishing</div>;
    }
  }

  handlePublish(e) {
    e.preventDefault();

    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: this.state.slug,
        title: this.state.title,
        description: this.state.description,
        banner: this.state.banner,
        content: this.state.content,
        googleIdToken: this.state.googleIdToken
      }),
    })
      .then(
        (res) => {
          if (res.status === 200) {
            this.props.history.push('/post/' + this.state.slug);
          } else {
            throw Error;
          }
        }
      ).catch(() => {
        this.setState({
          publishingError: true,
        });
      });
  }

  render() {
    if (this.state.googleIdToken) {
      return (
        <div id='publishPage'>
          <GoogleSignIn handleSignIn={this.handleSignIn} googleIdToken={this.state.googleIdToken} />

          <div id='publish'>
            <div id='input'>  
              <h1>Publish a Post</h1>
              <form onSubmit={this.handleSubmit}>
                <br></br>
                <input name='slug' type='text' value={this.state.slug} onChange={this.handleFormChange} />
                <br></br>
                <input className='formControl' name='title' type='text' value={this.state.title} onChange={this.handleFormChange} />
                <br></br>
                <input name='description' type='text' value={this.state.description} onChange={this.handleFormChange} />
                <br></br>
                <input name='banner' type='text' value={this.state.banner} onChange={this.handleFormChange} />
                <br></br>

                <textarea name='content' onChange={this.handleFormChange} value={this.state.content} />

                <button id='publishButton' onClick={this.handlePublish}>Publish!</button>
                <br></br>

                {this.getPublishingError()}
              </form>
            </div>

            <div id='postPreview'>
              <PostHeader
                title={this.state.title}
                description={this.state.description}
                date={new Date().toDateString()}
                banner={this.state.banner}
              />

              <PostContent content={this.state.content} />
            </div>
          </div>
        </div>

      );
    } else {
      return (
        <GoogleSignIn handleSignIn={this.handleSignIn} googleIdToken={this.state.googleIdToken} />
      );
    }
  }
}

Publish.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Publish);