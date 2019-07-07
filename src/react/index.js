import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './AppRouter';
import '../images/favicon.ico';
import '../css/base.css';

// import assets
import '../files/resume.pdf';
import '../files/diagram.svg';
import '../images/logo_github.png';
import '../images/logo_linkedin.png';
import '../images/logo_mail.png';
import '../images/prof_pic.png';
import '../images/client_id.png'
import '../images/new_project.png'
import '../images/publish.png'
import '../images/reserve_address.png'
import '../images/vm_instance.png'

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}