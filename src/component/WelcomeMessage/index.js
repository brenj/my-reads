import PropTypes from 'prop-types';
import React from 'react';
import { Message } from 'semantic-ui-react';

import './welcome-message.css';

const WELCOME_MESSAGE_HEADER = 'Welcome to Udacity MyReads!';
const WELCOME_MESSAGE_CONTENT = (
  'A bookshelf app for finding and organizing your favorite books.');

const propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  handleDismissWelcome: PropTypes.func.isRequired,
};

function WelcomeMessage(props) {
  const { color, handleDismissWelcome, size } = props;

  return (
    <div className="welcome-message">
      <Message
        onDismiss={handleDismissWelcome}
        header={WELCOME_MESSAGE_HEADER}
        content={WELCOME_MESSAGE_CONTENT}
        size={size}
        color={color}
      />
    </div>
  );
}
WelcomeMessage.propTypes = propTypes;

export default WelcomeMessage;
