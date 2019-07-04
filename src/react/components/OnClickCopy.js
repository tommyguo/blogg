import React from 'react';
import PropTypes from 'prop-types';

class OnClickCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRecentlyCopied: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const textField = document.createElement('textarea');
    textField.innerText = this.props.content;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    this.setState({
      isRecentlyCopied: true
    });

    setTimeout(() => {
      this.setState({
        isRecentlyCopied: false
      });
    }, 500);
  }

  getMessage() {
    if (this.state.isRecentlyCopied) {
      return <span className='copyMessage' id={this.props.id}>Copied!</span>;
    }
  }

  render() {
    return (
      <span>
        <a href='#' onClick={this.handleClick}>{this.props.children}</a>
        {this.getMessage()}
      </span>
    );
  }
}

OnClickCopy.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.element,
};

export default OnClickCopy;