import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './AppRouter';
import '../images/favicon.ico';
import '../css/base.css';

// import assets
import '../images/logo_github.png';
import '../images/logo_linkedin.png';
import '../images/logo_mail.png';
import '../files/resume.pdf';

import '../images/post_pic_1.jpg';
import '../images/post_pic_2.jpg';
import '../images/post_pic_3.jpg';
import '../images/prof_pic.png';

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}