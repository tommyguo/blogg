import React from 'react';

import '../../css/uploadImage/uploadImage.css';
import GoogleSignIn from '../components/GoogleSignIn';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      googleIdToken: null,
    };
  }

  handleSignIn(googleIdToken) {
    this.setState({
      googleIdToken: googleIdToken
    });
  }

  render() {
    if (this.state.googleIdToken) {
      return (
        <div id='uploadImagePage'>
          <GoogleSignIn handleSignIn={this.handleSignIn} googleIdToken={this.state.googleIdToken} />
          <br></br>
          <br></br>

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
        <GoogleSignIn handleSignIn={this.handleSignIn} googleIdToken={this.state.googleIdToken} />
      );
    }
  }
}

export default UploadImage;