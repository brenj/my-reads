import PropTypes from 'prop-types';
import React from 'react';

import Shelf from '../Shelf';
import { getShelvesWithTitles } from '../../utils';

const propTypes = {
  books: PropTypes.objectOf(PropTypes.array).isRequired,
  onShelfChanged: PropTypes.func.isRequired,
};

function BookCase(props) {
  const { books } = props;

  return (
    <div>
      {getShelvesWithTitles().map(([shelf, title]) => (
        <Shelf
          key={shelf}
          books={books[shelf]}
          name={title}
          onShelfChanged={props.onShelfChanged}
        />
      ))}
    </div>
  );
}

BookCase.propTypes = propTypes;

export default BookCase;
