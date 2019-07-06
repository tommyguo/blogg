import React from 'react';
import PropTypes from 'prop-types';

import { VALID_EMAILS } from '../../config/config';

class GoogleSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      signInError: false,
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
    if (VALID_EMAILS.includes(googleUser.getBasicProfile().getEmail())) {
      const signInButton = document.getElementsByClassName('abcRioButton')[0];
      this.setState({
        signInError: false,
        email: googleUser.getBasicProfile().getEmail(),
      });

      this.props.handleSignIn(googleUser.getAuthResponse().id_token);
      signInButton.classList.add('hidden');
    } else {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        this.setState({
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
      this.props.handleSignIn(null);

      window.gapi.signin2.render('g-signin2', {
        'width': 250,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn
      });
    });
  }

  getSignInError() {
    if (this.state.signInError) {
      return <div className='error'>Invalid Email</div>;
    }
  }

  render() {
    if (this.props.googleIdToken) {
      return (
        <div className='logInBar'>
          <a href='#' onClick={this.signOut}>Sign Out of {this.state.email}</a>
          <div id='g-signin2'></div>
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

GoogleSignIn.propTypes = {
  handleSignIn: PropTypes.func,
  googleIdToken: PropTypes.string,
};

export default GoogleSignIn;