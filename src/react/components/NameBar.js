import React from 'react';

import Image from './Image';
import OnClickCopy from './OnClickCopy';

class NameBar extends React.Component {
  render() {
    return (
      <div id='nameBar'>
        <h1 id='name'>Tommy Guo</h1>

        <div className='logos'>
          <a href='https://github.com/tommyguo' target='blank'>
            <Image className='logo' id='github' src='/logo_github.png' />
          </a>
          <a href='https://www.linkedin.com/in/thomasguo' target='blank'>
            <Image className='logo' id='linkedin' src='/logo_linkedin.png' />
          </a>
          <OnClickCopy id='emailCopy' content='tommyguo97@gmail.com'>
            <Image className='logo' id='email' src='/logo_mail.png' />
          </OnClickCopy>
          
        </div>
      </div>
    );
  }
}

export default NameBar;