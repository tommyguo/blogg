import React from 'react';
import PropTypes from 'prop-types';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  getDetails() {
    if (this.state.isToggleOn) {
      return this.props.children;
    }
  }

  render() {
    return (
      <div className='dropDown'>
        <h2><a className='header' href='#' onClick={this.handleClick}>{this.props.header}</a></h2>
        <div className='detailsContainer'>{this.getDetails()}</div>
      </div>
      
    );
  }
}

DropDown.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element,
};

export default DropDown;