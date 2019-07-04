import React from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';
import { withRouter } from 'react-router-dom';

import '../../css/publish/publish.css';
import '../../css/postContent.css';
import PostHeader from '../components/PostHeader';

import { VALID_EMAILS } from '../../config/config';

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      slug: 'url-slug',
      title: 'Post Title', 
      description: 'Post Description',
      banner: 'Banner Image URL',
      content: 'Post Content',
      publishingError: false,
      signInError: false,
      googleIdToken: null,
      email: null,
    };
  }

  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      'width': 250,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
    });
  }

  onSignIn(googleUser) {
    this.setState({
      googleIdToken: googleUser.getAuthResponse().id_token,
      email: googleUser.getBasicProfile().getEmail(),
    });

    if (VALID_EMAILS.includes(googleUser.getBasicProfile().getEmail())) {
      const signInButton = document.getElementsByClassName('abcRioButton')[0];
      this.setState({ signInError: false });
      signInButton.classList.add('hidden');
    } else {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        this.setState({
          googleIdToken: null,
          signInError: true,
        });

        window.gapi.signin2.render('g-signin2', {
          'width': 250,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': this.onSignIn
        });
      });
    }
  }

  signOut(e) {
    e.preventDefault();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({
        googleIdToken: null,
      });

      window.gapi.signin2.render('g-signin2', {
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn
      });
    });
  }

  handleFormChange(e) {
    const name = event.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  getRedirect() {
    return '/' + this.state.slug;
  }

  getPublishingError() {
    if (this.state.publishingError) {
      return <div className='error'>There was an error publishing</div>;
    }
  }

  getSignInError() {
    if (this.state.signInError) {
      return <div className='error'>Invalid Email</div>;
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

  getOutput() {
    const md = new Remarkable();

    return { __html: md.render(this.state.content) };
  }

  render() {
    if (this.state.googleIdToken) {
      return (
        <div id='publishPage'>
          <div className='logInBar'>
            <a href='#' onClick={this.signOut}>Sign Out of {this.state.email}</a>
            <div id='g-signin2'></div>
          </div>

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

              <div id='content' dangerouslySetInnerHTML={this.getOutput()}></div>
            </div>
          </div>
        </div>

      );
    } else {
      return (
        <div>
          {this.getSignInError()}
          <div id='g-signin2'></div>
        </div>
      );
    }
  }
}

Publish.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Publish);