import React from 'react';

import '../../css/home/nameBar.css';
import '../../css/home/sideBar.css';
import '../../css/home/postsPreview.css';
import NameBar from '../components/NameBar';
import SideBar from '../components/SideBar';
import PostsPreview from '../components/PostsPreview';

class Home extends React.Component {
  render() {
    return (
      <div id='home'>
        <NameBar />
        <SideBar />
        <PostsPreview />
      </div>
    );
  }
}

export default Home;