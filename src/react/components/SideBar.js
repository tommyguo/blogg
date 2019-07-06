import React from 'react';

import DropDown from './DropDown';

function getAboutDetails() {
  return (
    <div>
      <h3>
        Welcome to my blog! I&#39;ll be writing about tech, board games, and life.
        I just graduated from NYU, and I&#39;ll be a software engineer at Stripe starting July 2019.
        Currently based in NYC.
      </h3>
    </div>
  );
}

function getProjectDetails() {
  return (
    <div>
      <h3>
        <a href='https://github.com/tommyguo/blogg' target='blank'>blogg</a>
        <br></br>
        <a href='https://github.com/tommyguo/reversiAI' target='blank'>reversi AI</a>
        <br></br>
        <a href='https://github.com/tommyguo/taxi' target='blank'>taxi</a>
      </h3>
    </div>
  );
}

class SideBar extends React.Component {
  render() {
    return (
      <div id='sideBar'>
        <h2>Software Engineer <a href='https://stripe.com' target='blank'>@Stripe</a></h2>
        <DropDown header='About'>{getAboutDetails()}</DropDown>
        <DropDown header='Projects'>{getProjectDetails()}</DropDown>
        <h2><a href='/resume.pdf' target='blank'>Resumé</a></h2>        
      </div>
    );
  }
}

export default SideBar;