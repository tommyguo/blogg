import React from 'react';

import '../../css/uploadImage/uploadImage.css';
import { VALID_EMAILS } from '../../config/config';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
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
      this.setState({ signInError: false });
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

  getSignInError() {
    if (this.state.signInError) {
      return <div className='error'>Invalid Email</div>;
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

  render() {
    if (this.state.googleIdToken) {
      return (
        <div id='uploadImagePage'>
          <div className='logInBar'>
            <a href='#' onClick={this.signOut}>Sign Out of {this.state.email}</a>
            <div id='g-signin2'></div>
          </div>

          <form action='/api/image' encType='multipart/form-data' method='POST'>
            <label>
              {/* connect-history-api-fallback reroutes get requests to paths without a dot so include a dot if you want to see it in dev!*/}
              Image Name (should include the extension if you want to view it in dev)
            <br></br>
              <input type='text' name='imageName' />
            </label>
            <br></br>
            <br></br>
            <input type='file' name='image' accept='image/*' />
            <br></br>
            <br></br>
            <input type='submit' value='Upload Photo' />
            {/* super hacky */}
            <input type='text' name='googleIdToken' className='hidden' value={this.state.googleIdToken} />
          </form>
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

export default UploadImage;